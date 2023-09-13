import { HandPalm, Play } from "phosphor-react";

import  { useForm, } from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import * as zod from 'zod'
import { useEffect, useState } from "react";

import { CountdownContainer, FormContainer, HomeContainer, MinutesAmountInput, Separator, StartCountDownButton, StopCountDownButton, TaskInput } from "./styles";

import {differenceInSeconds} from 'date-fns';

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod.number().min(1,'O ciclo precisa ser de no mínimo 5 minutos').max(60,'O ciclo precisa ser de no máximo 60 minutos'),
})



type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date 
  finishedDate?: Date
}

export function Home() {

  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [activeCycleId, setActiveCycleId] = useState<string|null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);

  const {register, handleSubmit, watch, reset} = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema), 
    defaultValues: {
      task: '',
      minutesAmount: 0,
    }
  })
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  const totalSeconds = activeCycle ? activeCycle.minutesAmount *60 : 0;

useEffect(() => {

  let interval: number;

  if(activeCycle) {
    interval = setInterval(() => {

      const secondsDifference = differenceInSeconds(
       new Date(),
       activeCycle.startDate,
       )

      if (secondsDifference >= totalSeconds) {

             setCycles( (state) =>  state.map((cycle) => {
              if(cycle.id === activeCycleId) {
                return {...cycle, finishedDate: new Date()}
              } else {
                return cycle
              }
             }),
             )

             setAmountSecondsPassed(totalSeconds)
             clearInterval(interval)
           } else {
            setAmountSecondsPassed(secondsDifference)
           }
            }, 1000) 
  }

    return () => {
      clearInterval(interval) 
  }
},  [activeCycle, totalSeconds, activeCycleId])

  function handleCreateNewCycle(data: NewCycleFormData) {
    const id = String(new Date().getTime());

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }

    setCycles((state) => [...state, newCycle])
    setActiveCycleId(id);
    setAmountSecondsPassed(0);
    reset();
  }

  function handleInterruptCycle() {
    setCycles( (state) =>
       state.map((cycle) => {
      if(cycle.id === activeCycleId) {
        return {...cycle, interruptedDate: new Date()}
      } else {
        return cycle
      }
    }),
    )
    setActiveCycleId(null)
  }


  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0

  const mininutesAmount = Math.floor(currentSeconds / 60);
  const secondsAmount = currentSeconds % 60;

  const minutes = String(mininutesAmount).padStart(2, '0') 
  const seconds = String(secondsAmount).padStart(2, '0') 

  useEffect(() => {
    document.title = `${minutes} : ${seconds}`
  }, [minutes, seconds])

  const task = watch('task')
  const isSubmitDisabled = !task;

  console.log(handleInterruptCycle)
   return (
    <HomeContainer>
        <form onSubmit={handleSubmit(handleCreateNewCycle)} action=""> 

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
      

        <CountdownContainer>
            <span>{minutes[0]}</span>
            <span>{minutes[1]}</span>
            <Separator>:</Separator>
            <span>{seconds[0]}</span>
            <span>{seconds[1]}</span>
        </CountdownContainer>


        {activeCycle ? (
            <StopCountDownButton onClick={handleInterruptCycle} type="button"> 
            <HandPalm size={24}/> 
            interromper
            </StopCountDownButton>

        ) :   

           <StartCountDownButton disabled={isSubmitDisabled} type="submit"> 
           <Play size={24}/> 
                   Começar
           </StartCountDownButton>}

        </form>
    </HomeContainer>
   )  
}