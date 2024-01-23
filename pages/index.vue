<script setup lang="ts">
  const connection = await useFetch('/api/connection')
  const newBitcoin  = await useFetch('/api/createBitcoin')
  const {data} = await useFetch('/api/getBitcoin')

  function compare(a: any, b: any) {
    const dateA: any = new Date(a.time)
    const dateB: any = new Date(b.time)
    return dateB - dateA
  }

  const dataSorted = data.value!.sort(compare)

interface IData {
  time: string,
  USD: string,
  GBP: string,
  EUR: string
}

  function getLastData(dataArray: any, year=0, month=0, date=0, hours=0, minutes=0): IData[] {
    const dateStart: any = new Date(Date.UTC(
        new Date().getUTCFullYear() - year,
        new Date().getUTCMonth() - month,
        new Date().getUTCDate() - date,
        new Date().getUTCHours() - hours,
        new Date().getUTCMinutes() - minutes,
    ))
    return dataArray
        .filter( (dataI: any) => new Date(dataI.time) > dateStart)
  }

  const dataSortedLast = useState('test',() => getLastData(dataSorted, 0, 0, 0, 0, 0) )

  const dataState = useState('state', () => {
    return {
      year: 0,
      month: 0,
      date: 0,
      hours: 0,
      minutes: 0
    }
  })

</script>


<template>
  <section class="container w-2xl mx-auto bg-gray-200 p-2">

    <div class="flex gap-16 sticky w-full px-4 rounded bg-orange-400 items-center top-0 justify-between">

      <div class="flex gap-16 w-fit p-2 rounded bg-orange-400 items-center top-0">

        <div class="flex gap-4">
          <button class="rounded bg-green-600 hover:bg-green-400 px-4 py-2"
                  @click="dataSortedLast = getLastData(dataSorted, 0, 0, 1, 0, 0)">День</button>
          <button class="rounded bg-green-600 hover:bg-green-400 px-4 py-2"
                  @click="dataSortedLast = getLastData(dataSorted, 0, 0, 7, 0, 0)">Неделя</button>
          <button class="rounded bg-green-600 hover:bg-green-400 px-4 py-2"
                  @click="dataSortedLast = getLastData(dataSorted, 0, 1, 0, 0, 0)">Месяц</button>
          <button class="rounded bg-green-600 hover:bg-green-400 px-4 py-2"
                  @click="dataSortedLast = getLastData(dataSorted, 1, 0, 0, 0, 0)">Год</button>
        </div>

      </div>


      <div class="flex w-fit p-2 rounded bg-orange-400 left-full top-0">

        <form class="flex gap-2"
              @submit="(event) => {
              event.preventDefault()
              dataSortedLast = getLastData(
                dataSorted,
                Number(dataState.year),
                Number(dataState.month),
                Number(dataState.date),
                Number(dataState.hours),
                Number(dataState.minutes)
              )}">
          <div class="flex flex-col items-center gap-2">
            <label>Год</label>
            <input class="p-2 w-16 rounded bg-gray-400 text-center" v-model="dataState.year" placeholder="Год">
          </div>
          <div  class="flex flex-col items-center gap-2">
            <label>Месяц</label>
            <input class="p-2 w-16 rounded bg-gray-400 text-center" v-model="dataState.month" placeholder="Месяц">
          </div>
          <div  class="flex flex-col items-center gap-2">
            <label>День</label>
            <input class="p-2 w-16 rounded bg-gray-400 text-center" v-model="dataState.date" placeholder="День">
          </div>
          <div  class="flex flex-col items-center gap-2">
            <label>Час</label>
            <input class="p-2 w-16 rounded bg-gray-400 text-center" v-model="dataState.hours" placeholder="Час">
          </div>
          <div  class="flex flex-col items-center gap-2">
            <label>Минута</label>
            <input class="p-2 w-16 rounded bg-gray-400 text-center" v-model="dataState.minutes" placeholder="Минута">
          </div>
          <div  class="flex flex-col">

          </div>

          <button class="p-2 rounded w-1/4 bg-green-600 hover:bg-green-400" type="submit">Задать период</button>
        </form>

      </div>
    </div>








    <div class="p-4 flex gap-[200px]">
      <div>
        <div class="mb-4 sticky top-16">Дата</div>
        <div v-for="dataItem in dataSortedLast" class="mb-2 text-xs">{{dataItem.time}}</div>
      </div>

      <div>
        <div class="mb-4 sticky top-16">Доллары</div>
        <div v-for="dataItem in dataSortedLast" class="mb-2 text-xs">{{dataItem.USD}}</div>
      </div>

      <div>
        <div class="mb-4 sticky top-16">Фунт стелрингов</div>
        <div v-for="dataItem in dataSortedLast" class="mb-2 text-xs">{{dataItem.GBP}}</div>
      </div>

      <div>
        <div class="mb-4 sticky top-16">Евро</div>
        <div v-for="dataItem in dataSortedLast" class="mb-2 text-xs">{{dataItem.EUR}}</div>
      </div>
    </div>

  </section>

</template>