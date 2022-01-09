let $NumOfEmploees = 0;
let $Hourse = 0;
let $Minutes = 0;
let $EndTime = 0;
let startDate = 0;
let endDate = 0;
let allTieConvertOnMinuts = 0;
let PersonTime = 0;
let IteratePersonal = 0;

enter.onclick = () => {readingValues();};

function readingValues(){
    document.querySelector('.palataData').classList.add('_hide');
    formMinutes.classList.remove('_bag');
    document.querySelectorAll('.divIn').forEach(e => e.remove());
    $NumOfEmploees = formEmploees.value;
    $Hourse = check$Hourse();
    $Minutes = +formMinutes.value;
    $EndTime = check$EndTime();
    if($NumOfEmploees === undefined || $NumOfEmploees === null || $NumOfEmploees === '' || $Hourse === undefined || $Hourse === null || $Hourse === '' || $Minutes === undefined || $Minutes === null || $Minutes === ''){
        if($NumOfEmploees === undefined || $NumOfEmploees === null || $NumOfEmploees === ''){
            document.querySelector('.palataData').classList.add('_hide')
            formEmploees.classList.add('_bag');
            setTimeout(() => {formEmploees.classList.remove('_bag')},1000)
        }else{
            formEmploees.classList.remove('_bag')};
        if($Hourse === undefined || $Hourse === null || $Hourse === ''){
            document.querySelector('.palataData').classList.add('_hide')
            formHourse.classList.add('_bag');
            setTimeout(() => {formHourse.classList.remove('_bag')},1000)
        }else{
            formHourse.classList.remove('_bag');
        };
        if($Minutes == undefined || $Minutes == '' || $Minutes === null){
            document.querySelector('.palataData').classList.add('_hide')
            formMinutes.classList.add('_bag');
        }else{
            formMinutes.classList.remove('_bag');
        };
    }else{
        startDate = calculationStartDate($Hourse,$Minutes);
        endDate = calculationEndDate();
        allTieConvertOnMinuts = calculationTime (startDate, endDate);
        PersonTime = calculatedPersonTime(allTieConvertOnMinuts,$NumOfEmploees);
        IteratePersonal = iteratePersonal($NumOfEmploees, PersonTime, endDate);
        document.querySelector('.palataData').classList.remove('_hide')
    }
};
function check$EndTime(){return formAgreement.checked ? true : false;};
function check$Hourse(){return formHourse.value == 0? 24 : formHourse.value}

function calculationStartDate($Hourse,$Minutes){
    let thatHourse = $Hourse;
    let thatMinutes = $Minutes;
    let startDate = new Date();
    if(thatHourse < 0 || thatMinutes < 0 || isNaN(thatHourse) || isNaN(thatMinutes)){
        return undefined;
    };
    startDate.setHours(thatHourse, [thatMinutes]);
    return startDate;
};

function calculationEndDate(){
    let endDate = new Date();
    let check = endDate.getHours();
    let day = endDate.getDate();
    let thatHourse = 0;
    let thatMinutes = 0;
    if($EndTime == true){thatHourse = 6; thatMinutes = 30}else if($EndTime == false){thatHourse = 6};

    if(check >= 0 && check <= 6){
        endDate.setHours(thatHourse, [thatMinutes]);
    }else if(check > 6 && check <= 23){endDate.setDate(day + 1); endDate.setHours(thatHourse, [thatMinutes]);};
    return endDate;
};

function calculationTime (startDate, endDate){
    return Math.floor((endDate-startDate) / 60000);
};

function calculatedPersonTime(allTieConvertOnMinuts,$NumOfEmploees){
    if($NumOfEmploees == 0 || undefined || null){return undefined};
    return 10*(Math.round((allTieConvertOnMinuts / $NumOfEmploees)/10));
};

function iteratePersonal($NumOfEmploees, PersonTime, endDate){
    let map = new Map();
    let numOfEmploees = $NumOfEmploees;
    let personTime = PersonTime;
    let EndDate = endDate;
    let minutes = EndDate.getMinutes();
    let iterateTime = [];
    let numOfPerson = 1;
    let date = new Date()

    for(let i = 0; i <= numOfEmploees; i++){
        if(i == 0){
            iterateTime.push(`${EndDate.getHours()}:${EndDate.getMinutes()}`);
        }else{
            date.setHours(6,minutes - personTime);
            iterateTime.push(`${date.getHours()}:${date.getMinutes()}`);
            minutes -= personTime;
        };  
    };

    let reverse = iterateTime.reverse();
    
    for(let i = 0; i < reverse.length - 1; i++){
        map.set(reverse[i], reverse[i + 1]);
    }; 
    
    let iterateVar = Array.from(map.entries())

    for(let [key, value] of iterateVar){
        let iterate = document.querySelector('.palataData')
        let create = document.createElement('div');
        create.className = "divIn"
        create.innerHTML = `${numOfPerson} человек <br> начало: ${key}<br> конец: ${value}`
        iterate.append(create)
        numOfPerson++;
    };
};
