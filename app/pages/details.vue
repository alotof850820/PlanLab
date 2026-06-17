<script setup lang="ts">
const plan = useFinancialPlan()

const detailRows = computed(() => {
  return plan.yearlyData.value.slice(1).map((row, index) => {
    const previous = plan.yearlyData.value[index]
    const displayInput =
      plan.stopInputYear.value > plan.totalYears.value || row.year <= plan.stopInputYear.value
        ? plan.annualInput.value
        : 0

    return {
      ...row,
      previousValue: previous.value,
      displayInput,
    }
  })
})
const isHouseEventRow = (year: number) => plan.buyHouse.value && year === plan.houseYear.value

useHead({
  title: '明細 | PlanLab',
})
</script>

<template>
  <div class="page-shell space-y-4">
    <header class="mb-[18px]">
      <h1 class="page-title">年度收支明細</h1>
      <p class="page-sub">逐年檢視投入、房貸、增值、頭期與提領</p>
    </header>

    <section class="card max-h-[calc(100vh-160px)] overflow-auto p-0">
      <table class="w-full min-w-[900px] border-collapse text-xs">
        <thead class="table-head sticky top-0">
          <tr>
            <th class="table-th">年份</th>
            <th class="table-th text-right">期初</th>
            <th class="table-th text-right">投入</th>
            <th class="table-th text-right">房貸</th>
            <th class="table-th text-right">增值</th>
            <th class="table-th text-right">頭期</th>
            <th class="table-th text-right">其他</th>
            <th class="table-th text-right">提領</th>
            <th class="table-th text-right">期末</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="row in detailRows"
            :key="row.year"
            class="detail-row"
            :class="{ 'is-event-row': isHouseEventRow(row.year) }"
            :data-event-row="isHouseEventRow(row.year) ? 'house-purchase' : undefined"
            :data-event-year="isHouseEventRow(row.year) ? row.year : undefined"
          >
            <td class="table-td font-medium">
              <span>第 {{ row.year }} 年</span>
              <span v-if="isHouseEventRow(row.year)" class="detail-event-badge">買房事件</span>
            </td>
            <td class="table-td table-muted text-right">{{ row.previousValue.toLocaleString() }}</td>
            <td class="table-td money-input text-right">{{ row.displayInput > 0 ? `+${row.displayInput.toLocaleString()}` : '-' }}</td>
            <td class="table-td money-house text-right">{{ row.houseLoan > 0 ? `-${row.houseLoan.toLocaleString()}` : '-' }}</td>
            <td class="table-td money-growth text-right">+{{ row.growth.toLocaleString() }}</td>
            <td class="table-td money-negative text-right">{{ row.downPayment > 0 ? `-${row.downPayment.toLocaleString()}` : '-' }}</td>
            <td class="table-td money-other text-right">-</td>
            <td class="table-td money-withdrawal text-right">{{ row.withdrawal > 0 ? `-${row.withdrawal.toLocaleString()}` : '-' }}</td>
            <td class="table-td table-strong text-right">{{ row.value.toLocaleString() }}</td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>
