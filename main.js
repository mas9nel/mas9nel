let $width = fullscreen_photo.clientWidth;
let $height = fullscreen_photo.clientHeight;
let $right = fullscreen_photo.offsetLeft;
let $top = Math.round(fullscreen_photo.clientHeight / 7);

let $widthLeftHeaderContainer = fullscreen_photo.clientWidth;
let $heightLeftHeaderContainer = fullscreen_photo.clientHeight;
let $rightLeftHeaderContainer = fullscreen_photo.offsetLeft;
let $topLeftHeaderContainer = Math.round(fullscreen_photo.clientHeight / 7);

window.onresize = () => {
    resizeHeaderContainer(); 
    resizeLeftHeaderContainer();
    resizeWrapper();
    resizeFullScreenTwoBody();
    resizeFullScreenTwoBodyMenu();
    resizeFullScreenTwoBodyBreakfast();
    resizeFullScreenTwoBodyLunch();
    resizeFullScreenTwoBodyDinner();
    console.log($width, $height, $right, $top);
};
console.log($width, $height, $right, $top);

resizeHeaderContainer(); 
resizeLeftHeaderContainer();
resizeWrapper();
resizeFullScreenTwoBody();
resizeFullScreenTwoBodyMenu();
resizeFullScreenTwoBodyBreakfast();
resizeFullScreenTwoBodyLunch();
resizeFullScreenTwoBodyDinner();

function resizeHeaderContainer (){
    $width = fullscreen_photo.clientWidth;
    $height = fullscreen_photo.clientHeight;
    $right = fullscreen_photo.offsetLeft;
    $top = Math.round(fullscreen_photo.clientHeight / 7);
    if(fullscreen_photo.clientWidth <= 530){$top = fullscreen_photo.clientHeight + (fullscreen_photo.clientHeight * 3) +'px';};
    
    document.querySelector('#header_container').style.maxWidth = $width / 2 + Math.round(fullscreen_photo.clientWidth / 7,6) +'px';
    document.querySelector('#header_container').style.maxHeight = $height / 5 + 6 +'px';
    document.querySelector('#header_container').style.right = $right + 'px';
    document.querySelector('#header_container').style.top = $top + 'px'; 
};

function resizeLeftHeaderContainer (){
    $widthLeftHeaderContainer = fullscreen_photo.clientWidth;
    $$heightLeftHeaderContainer = fullscreen_photo.clientHeight;
    $rightLeftHeaderContainer = fullscreen_photo.offsetLeft;
    $topLeftHeaderContainer = Math.round(fullscreen_photo.clientHeight / 7);
    if(fullscreen_photo.clientWidth <= 530){$topLeftHeaderContainer = fullscreen_photo.clientHeight + (fullscreen_photo.clientHeight * 3) +'px';};

    document.querySelector('#left_header_container').style.maxWidth = $widthLeftHeaderContainer / 3 +'px';
    document.querySelector('#left_header_container').style.maxHeight = $heightLeftHeaderContainer +'px';
    document.querySelector('#left_header_container').style.left = $rightLeftHeaderContainer + Math.round($rightLeftHeaderContainer / 15) + 'px';
    document.querySelector('#left_header_container').style.top = $topLeftHeaderContainer + 'px';
};

function resizeWrapper (){
    document.querySelector('#wrapper').style.fontSize = ($width / 38) + 'px';
};

function resizeFullScreenTwoBody (){
    document.querySelector('.fullscreen_two_body').style.fontSize = ($width / 38) + 'px';
};

function resizeFullScreenTwoBodyMenu (){
    document.querySelector('.fullscreen_two_body_menu').style.maxHeight = $height / 5 +'px';
    document.querySelector('.fullscreen_two_body_menu').style.maxWidth = $width / 4 +'px';
};

function resizeFullScreenTwoBodyBreakfast (){
    document.querySelector('.fullscreen_two_body_breakfast').style.maxHeight = $height / 6 +'px';
};

function resizeFullScreenTwoBodyLunch (){
    document.querySelector('.fullscreen_two_body_lunch').style.maxHeight = $height / 6 +'px';
};

function resizeFullScreenTwoBodyDinner (){
    document.querySelector('.fullscreen_two_body_dinner').style.maxHeight = $height / 6 +'px';
};

document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');
    form.addEventListener('submit', formSend);

    async function formSend(e) {
        e.preventDefault();

        let error = formValidate(form);

        if (error === 0){
            form_body.classList.add('_sending');
            let response = await fetch('sendmail.php', {
                method: 'POST',
                body: FormData 
            });
            if(response.ok){
                let result = await response.json();
                alert(result.message);
                form.reset();
                form_body.classList.remove('_sending');
            }else{
                alert('If it was a real site, it was worked!');
                form_body.classList.remove('_sending');
            };
        }else{
            alert('Check data!')
        };
    };

    function formValidate(form){
        let error = 0;
        let formReq = document.querySelectorAll('._req');

        for(let index = 0; index < formReq.length; index++){
            const input = formReq[index];
            formRemoveError(input);

            if(input.classList.contains('_email')){
                if (emailTest(input)){
                    formAddError(input);
                    error++;
                };
            }else if(input.getAttribute("type") === "checkbox" && input.checked === false){
                formAddError(input);
                error++;
            }else{
                if (input.value === ''){
                    formAddError(input);
                    error++;
                };
            };

        };
        return error;
    };
    
    function formAddError(input) {
        input.parentElement.classList.add('_error');
        input.classList.add('_error')
    };

    function formRemoveError(input) {
        input.parentElement.classList.remove('_error');
        input.classList.remove('_error')
    };

    function emailTest(input) {
        return !/^\w+([\,-]?\w+)*@\w+([\,-]?\w+)*(\.\w{2,8})+$/.test(input.value)
    }
    
});