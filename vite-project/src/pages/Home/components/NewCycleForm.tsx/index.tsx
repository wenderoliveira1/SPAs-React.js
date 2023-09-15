import { FormContainer, MinutesAmountInput, TaskInput } from "./style";


export function  NewCycleForm() {
    return (
        <FormContainer>
            
        <label htmlFor="">Vou trabalhar em </label>
        <TaskInput 
         placeholder="Dê um nome para o seu projeto" 
         id="task"
         disabled={!!activeCycle}
         list="task-suggestions"
         {...register('task')}
        />

        <datalist id="task-suggestions">
          <option value="estudo" />
         
          <option value="descanso" />
        </datalist>

        <label htmlFor="">Durante</label>

        <MinutesAmountInput
         placeholder="00" 
         type="number"
         id="minutesAmount" 
         disabled={!!activeCycle}
         step={5}
         min={1}
         max={60}   
         {...register('minutesAmount', {valueAsNumber: true})}
        />

        <span>minutos.</span>

        </FormContainer>
      
    )
}