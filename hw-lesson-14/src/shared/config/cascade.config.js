const cascadeRules = {
  doctors: [
    {
      targetCollection: 'appointments',
      field: 'doctorId',
      op: '=='
    }
  ],
  patients: [
    {
      targetCollection: 'appointments', 
      field: 'patientId',
      op: '=='
    }
  ],
  appointments: []
}

export function getCascadeConfig(collectionName) {
  return cascadeRules[collectionName] || []
}

export function buildCascadeGraph(rules) {
  const graph = {}
  
  rules.forEach(rule => {
    if (!graph[rule.targetCollection]) {
      graph[rule.targetCollection] = []
    }
    graph[rule.targetCollection].push(rule)
  })
  
  return graph
}
