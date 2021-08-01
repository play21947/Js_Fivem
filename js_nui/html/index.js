$(document).ready(()=>{

    $(".container").hide()

    let display =(bool)=>{
        if(bool){
            $(".container").fadeIn(1000)
        }
        else{
            $('.container').fadeOut(1000)
        }
    }


    window.addEventListener('message', (e)=>{
        let item = JSON.parse(e.data)
        if(item.type === "ui"){
            if(item.status){
                display(true)
            }
            else{
                display(false)
            }
        }
    })

    document.onkeyup = (data) =>{
        if(data.which == 27){
            axios.post("http://js_nui/exit")
        }
    }

    $('.btn-submit').click(()=>{
        let inputVal = $('.input').val()
        axios.post('http://js_nui/get_weapon',{
            data: inputVal
        })
    })

    $('.btn-close').click(()=>{
        axios.post("http://js_nui/exit")
    })

})