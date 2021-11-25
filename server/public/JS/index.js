async function fetchTest(){
	const res = await fetch('/jsMainLangauge')
	const result = await res.json()
	console.log(result)
}

fetchTest();