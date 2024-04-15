import './App.css';
import {trainData} from "./data";
import {useState} from "react";

document.addEventListener("contextmenu", (event) => {
  event.preventDefault();
});

function EditableNumber(props) {
  let style = {...props.style}
  style.display = 'flex'
  return <div key={'editable.' + props.name} style={style}
              onClick={() => props.updateCallback(parseInt(props.value) + (props.increment || 1))}
              onContextMenu={() => props.updateCallback(parseInt(props.value) - (props.increment || 1))}
  >
    <div style={{marginRight: '5px'}}>{props.name}</div>
    <div style={{marginLeft: 'auto', marginRight: '5px'}}>{props.value}</div>
  </div>
}

function App() {
  const [activityLevel, setActivityLevel] = useState(7)
  const [playTime, setPlayTime] = useState(600)

  const allRequirements = (requirement, levels) => {
    let returnData = []
    if (requirement.train === 'wallet') {
      return returnData
    }
    const newRequirements = trainData[requirement.train][requirement.level - 1].requirements
    const requirementKeys = Object.keys(newRequirements)
    for (let j = 0; j < requirementKeys.length; j += 1) {
      const newRequirementKey = requirementKeys[j]
      const newRequirement = newRequirements[newRequirementKey]
      if (newRequirementKey === 'wallet') {
        returnData.push({train: 'wallet', level: newRequirements[newRequirementKey]})
      } else {
        let localLevel = levels[newRequirement.key] || 0
        while (localLevel < newRequirement) {
          returnData.push({train: newRequirementKey, level: localLevel + 1})
          localLevel += 1
        }
      }
    }
    return returnData
  }
  const walletNeeded = (requiredLevel, currentLevel) => {
    let cost = 0
    let level = currentLevel
    while (level < requiredLevel) {
      if (level === 1) {
        cost += 1000
      } else {
        cost += 2000 * (level - 1)
      }
      level += 1
    }
    return cost
  }

  const getEfficiency = (coolDown) => {
    let minutesPerCheck = 60
    let variance = 0
    if (activityLevel > 0) {
      minutesPerCheck = (60 / activityLevel)
      variance = Math.sqrt(minutesPerCheck)
    }
    const trainProbability = (Math.min((minutesPerCheck - variance * 2) / coolDown, 1) + Math.min((minutesPerCheck + variance * 2) / coolDown, 1)) / 2
    return (trainProbability / (minutesPerCheck / coolDown))
  }

  const getEarnings = (train, level) => {
    const data = trainData[train][level - 1]
    return getEfficiency(data.coolDown) * playTime * data.railSims / data.coolDown
  }

  const calculateChanges = (requirements, currentLevels, currentWallet, currentIncome) => {
    let localIncome = {...currentIncome}
    let localLevels = {...currentLevels}
    let localWallet = wallet
    let cost = 0
    let initialTrain = undefined
    requirements.forEach(requirement => {
      if (requirement.train === 'wallet') {
        cost += walletNeeded(requirement.level, localWallet)
        localWallet = Math.max(localWallet, requirement.level)
      } else {
        if (localLevels[requirement.train] === undefined) {
          localLevels[requirement.train] = 0
        }
        while ((localLevels[requirement.train] || 0) < requirement.level) {
          initialTrain = requirement.train
          cost += trainData[requirement.train][localLevels[requirement.train]].cost
          localLevels[requirement.train] += 1
        }
        if (localLevels[requirement.train] > (currentLevels[requirement.train] || 0)) {
          localIncome[requirement.train] = getEarnings(requirement.train, requirement.level)
        }
      }
    })

    let newIncome = 0
    let oldIncome = 0

    Object.keys(localIncome).forEach(train => {
      newIncome += localIncome[train]
      oldIncome += currentIncome[train] || 0
    })

    let net = 0

    if (cost > 0) {
      net = cost / (newIncome - oldIncome)
    }

    return {
      net: net,
      initial: {
        train: initialTrain,
        level: (currentLevels[initialTrain] || 0) + 1
      }
    }
  }

  let trainLevels = {}
  let simsPerDay  = {}
  let trainPath = []
  let wallet = 1
  let results = []
  let done = false
  while (!done) {
    done = true
    let bestTrain = undefined
    let bestNet = undefined
    let bestEarns = undefined
    let bestLevel = undefined
    let possibles = 0
    const trains = Object.keys(trainData)
    let earnings = 0
    Object.keys(simsPerDay).forEach(existingTrain => {
      earnings += simsPerDay[existingTrain]
    })
    for (let i = 0; i < trains.length; i += 1) {
      const train = trains[i]
      const currentLevel = trainLevels[train] || 0
      if (trainData[train][currentLevel]) {
        let hardRequirements = [{train: train, level: currentLevel + 1}]
        for (let j = 0; j < hardRequirements.length; j += 1) {
          hardRequirements = hardRequirements.concat(allRequirements(hardRequirements[j], trainLevels))
        }
        const changes = calculateChanges(hardRequirements, trainLevels, wallet, simsPerDay)
        const change = changes.initial
        if (bestNet === undefined || changes.net < bestNet) {
          bestNet = changes.net
          bestTrain = change.train
          bestLevel = change.level
          bestEarns = getEarnings(change.train, change.level)
        }
      }
    }
    if (bestTrain) {
      let titleText = ''
      if (possibles > 1) {
        titleText = trainPath.join('\n')
      }
      const requiredWallet = trainData[bestTrain][bestLevel - 1].requirements.wallet || 0
      const walletCost = walletNeeded(requiredWallet, wallet)
      if (walletCost > 0) {
        results.push({
          train: 'Wallet',
          level: requiredWallet,
          cost: walletCost,
          earns: '',
          coolDown: '',
          trainsPerDay: '',
          simsPerDay: Math.round(earnings),
          netsSimPerDay: '',
          daysToReach: '',
          title: titleText
        })
        wallet = requiredWallet
      }
      const data = trainData[bestTrain][bestLevel - 1]
      if (earnings === 0) {
        earnings = 1
      }
      const netSims = Math.round(bestEarns - (simsPerDay[bestTrain] || 0))
      results.push({
        train: bestTrain,
        level: bestLevel,
        cost: data.cost,
        earns: data.railSims,
        coolDown: data.coolDown,
        trainsPerDay: Math.round(playTime * getEfficiency(data.coolDown) / data.coolDown),
        simsPerDay: Math.round(earnings - (simsPerDay[bestTrain] || 0) + bestEarns),
        netSimsPerDay: netSims,
        daysToReach: Math.round(data.cost / netSims),
        title: titleText
      })
      trainLevels[bestTrain] = bestLevel
      simsPerDay[bestTrain] = bestEarns
      done = false
      trainPath = []
    }
  }
  return (
      <div style={{color: "white", backgroundColor: "lightsteelblue"}}>
        <EditableNumber name={"Activity Level"} updateCallback={(value) => setActivityLevel(value)} value={activityLevel} style={{width: '130px'}} />
        <EditableNumber name={"Play Time"} updateCallback={(value) => setPlayTime(value)} value={playTime} style={{width: '130px'}} increment={5} />
        <table>
          <thead>
            <tr>
              <th/>
              <th/>
              <th/>
              <th>Rail Sims</th>
              <th/>
              <th>Trains</th>
              <th>Total Sims</th>
              <th>Net Sims</th>
              <th>Days to</th>
            </tr>
            <tr>
              <th>Train</th>
              <th>Level</th>
              <th>Cost</th>
              <th>per Trip</th>
              <th>Cooldown</th>
              <th>per Day</th>
              <th>per Day</th>
              <th>per Day</th>
              <th>Pay Off</th>
            </tr>
          </thead>
          <tbody>
            {results.map(result => {
              return (
                  <tr title={result.title}>
                    <td>{result.train}</td>
                    <td align={"right"}>{result.level}</td>
                    <td align={"right"}>{result.cost}</td>
                    <td align={"right"}>{result.earns}</td>
                    <td align={"right"}>{result.coolDown}</td>
                    <td align={"right"}>{result.trainsPerDay}</td>
                    <td align={"right"}>{result.simsPerDay}</td>
                    <td align={"right"}>{result.netSimsPerDay}</td>
                    <td align={"right"}>{result.daysToReach}</td>

                  </tr>
              )
            })}
          </tbody>
        </table>

        {trainPath.map(line => {
          return <div>{line}</div>
        })}
      </div>
  );
}

export default App;
