const data = new URLSearchParams(document.location.search);
const emploee_distribution = new Map();

// выводим по нажатию
async function content_load(){
    document
    all_time(data);
    curent_emploee_time(data);
    time_distribution(emploee_distribution, data);
    document.getElementById("data").innerHTML = html_content(emploee_distribution, data);
}

if(data.has("hours_start"))document.addEventListener("DOMContentLoaded", content_load);

// получаем всё время (в минутах) до окончания смены
function all_time(data){
    const end_time = new Date()
    end_time.setHours(data.get("hours_end"), data.get("minutes_end"));
    
    const start_time = new Date();

    if (data.get("hours_start") >= 0 && data.get("hours_start") <= 6)
        start_time.setHours(data.get("hours_start"), data.get("minutes_start"));
    else{
        start_time.setDate(start_time.getDate() - 1)
        start_time.setHours(data.get("hours_start"), data.get("minutes_start"));
    }

    data.set("all_time", Math.floor((end_time - start_time) /60000));
}
// делим время на каждого сотрудника
function curent_emploee_time(data){
    let emploee_time = Math.floor(data.get("all_time") / data.get("employees"));
    const last_number = emploee_time % 10;

    data.set("time_before_processing", emploee_time);

    if(last_number > 2 && last_number < 8)
        emploee_time = (emploee_time - last_number) + 5;
    else if(last_number >= 8)
        emploee_time = (emploee_time - last_number) + 10;
    else
        emploee_time -= last_number;
    
    data.set("curent_emploee_time", emploee_time);
}

function add_simbol(time){
    return (time.toString().length == 1)? "0" + time : time;
}

// получаем текстовую информацию о распределении времени
function time_distribution(emploee_distribution, data){
    const curent_emploee_time = +data.get("curent_emploee_time");
    let temp_emploee_time = curent_emploee_time;
    

    for(let i = 1; i <= data.get("employees"); i++){
        let temp_date_end = new Date();
        temp_date_end.setHours(data.get("hours_start"), +data.get("minutes_start") + temp_emploee_time);

        let temp_date_start = new Date();
        temp_date_start.setHours(temp_date_end.getHours(), +temp_date_end.getMinutes() - curent_emploee_time);

        if(i == data.get("employees")) temp_date_end.setHours(data.get("hours_end"), data.get("minutes_end"));

        emploee_distribution.set(i , `${i} человек сидит с : ${add_simbol(temp_date_start.getHours())}:${
                                                               add_simbol(temp_date_start.getMinutes())} по: ${
                                                               add_simbol(temp_date_end.getHours())}:${
                                                               add_simbol(temp_date_end.getMinutes())}`);

        temp_emploee_time += curent_emploee_time;
    }
}
// формируем вывод в html
function html_content(emploee_distribution, data){
    let html = `Каждый сидит по: ${data.get("curent_emploee_time")} минут (${(data.get("curent_emploee_time") / 60).toFixed(2)} часа)<br>`;
    emploee_distribution.forEach((value) => html += `${value}<br>`);
    return html;
}

console.log(data.get("curent_emploee_time"))

emploee_distribution.forEach((value, key) => console.log(key, value));
