$(document).ready(()=>{
    $(".container").hide()

    window.addEventListener("message", (e)=>{
        let convert = JSON.parse(e.data)
        console.log(convert.status)
        if(convert.type === "ui"){
            if(convert.status === true){
                $('.container').show()
                $('.money').html("Money : " + convert.money + " Play2 Coin")
                convert.loadout.map((item)=>{
                    $('.display-grid').append("<div class='item'><p class='item-name'>"+ item.name +"</p></div>")
                })
            }
            else{
                $('.container').hide()
            }
        }
    })

    window.onkeyup=(data)=>{
        if(data.which === 27){
            axios.post("http://js_nui2/exit")
        }
    }

})