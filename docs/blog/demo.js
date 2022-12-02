function createMachine(stateMachineDefinition) {
  const machine = {
    value: stateMachineDefinition.initialState,
    transition() {
      return machine.value
    }
  }

  return machine
}

const machine = createMachine({
  initialState: 'off',
  off: {
    action: {
      onEnter(){
        console.log('off: enter')
      },
      onExit(){
        console.log('off: exit')
      }
    },
    transition: {
      switch: {

      }
    }
  },
  on: {
    action: {
      onEnter(){
        console.log('on: enter')
      },
      onExit(){
        console.log('on: exit')
      }
    },
    transition: {
      switch: {
        target: 'on',
        action(){
          console.log('transition action for "switch" in "off" state')
        }
      }
    }

  }
})

let state = machine.value
console.log(`current state: ${state} `)

state = machine.transition(state, 'switch')
console.log(`current state: ${state} `)

state = machine.transition(state, 'switch')
console.log(`current state: ${state} `)