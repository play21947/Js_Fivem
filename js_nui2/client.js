let ESX = null

emit("esx:getSharedObject", (obj)=>{
    ESX = obj
})

let Wait =async(ms)=>{
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{

        }, ms)
        resolve()
    })
}


var IsInventory = false


setTick(async()=>{
    await Wait(1000)
    if(IsControlJustReleased(0, 289)){
        LoadPlayerData()
        OpenInventory()
    }
})


RegisterCommand("nui", ()=>{
    if(display){
        display = false
        SetDisplay(false)
    }
    else{
        display = true
        SetDisplay(true)
    }
})


// RegisterNuiCallbackType("inventory")
// on('__cfx_nui:inventory', (data)=>{

// })

RegisterNuiCallbackType('exit')
on('__cfx_nui:exit', ()=>{
    CloseInventory()
})


let OpenInventory = () =>{
    IsInventory = true
    SetNuiFocus(true, true)
    ESX.TriggerServerCallback("play2:inven", (data)=>{
        let convert = JSON.parse(data)
        console.log(convert.money)
        SendNUIMessage(JSON.stringify({
            type: 'ui',
            status: true,
            money: convert.money,
            loadout: convert.loadout
        }))
    })
}


let CloseInventory =()=>{
    IsInventory = false
    SetNuiFocus(false, false)
    SendNUIMessage(JSON.stringify({
        type: 'ui',
        status: false
    }))
}


let LoadPlayerData=()=>{
    ESX.TriggerServerCallback("play2:inven", (data)=>{
        let convert = JSON.parse(data)
        console.log(convert.money)
        SendNUIMessage(JSON.stringify({
            type: 'item',
            status: true,
            money: convert.money
        }))
    })
}