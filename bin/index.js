#!/usr/bin/env node

const max_pomodoro_time = 90 //limite maximo de tempo de um pomodoro em minutos
const min_pomodoro_time = 30 //limite minimo de tempo de um pomodoro em minutos
const pomodoro_break_scale = 3 //proporção entre pomodoro e break 3 : 1

const run = () => {
	const total_time = process.argv[2]
	const total_working_time = (pomodoro_break_scale * total_time) / (pomodoro_break_scale + 1)
	const max_pomodoro_number = Math.floor(total_working_time / min_pomodoro_time)
	const min_pomodoro_number = Math.ceil(total_working_time / max_pomodoro_time)
	const n = max_pomodoro_number - min_pomodoro_number + 1
	const pomodoros = []
	for (let i = 1; i <= n; i++) {
		const _n = i + min_pomodoro_number
		const pomodoro_time = Math.floor(total_time / (_n + (_n - 1) / pomodoro_break_scale))
		const break_time = Math.floor((total_time - _n * pomodoro_time) / (_n - 1))
		const working_time = _n * pomodoro_time
		const resting_time = (_n - 1) * break_time
		const session_time = working_time + resting_time
		const proportion = pomodoro_time / break_time
		const pomo = {
			pomodoro_time,
			break_time,
			working_time,
			resting_time,
			session_time,
		}
		pomodoros.push(pomo)
		console.log(
			`${i}. ${_n} pomodoros de ${pomodoro_time}min com breaks de ${break_time}min, totalizando ${working_time}min de trabalho, ${resting_time}min de descanso e ${session_time}min de sessão. proporção ${proportion.toFixed(
				2,
			)}`,
		)
	}
	const greater_value = pomodoros.reduce(
		(acc, cur, index) => {
			if (acc.s > cur.working_time) return acc
			return { s: cur.working_time, index }
		},
		{ s: 0, index: -1 },
	)
	if (greater_value.index === -1) console.log(`nenhum pomodoro possível`)
	else console.log(`maior aproveitamento: ${greater_value.index + 1}`)
}

run()
