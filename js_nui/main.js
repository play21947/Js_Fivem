emit('esx:getSharedObject', (obj) => {
    ESX = obj
})


const Wait=async(ms)=>{
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{

        }, ms)
        resolve()
    })
}

var display = false


// RegisterCommand('nui', ()=>{
//     if(display == false){
//         SetDisplay(true)
//     }
//     else{
//         SetDisplay(false)
//     }
// })



RegisterNuiCallbackType('get_weapon')
on('__cfx_nui:get_weapon', (data, cb)=>{
    console.log(data.data)
    GetWeapon(data.data)
    SetDisplay(false)
})


RegisterNuiCallbackType('exit')
on('__cfx_nui:exit', (data, cb)=>{
    SetDisplay(false)
})

let GetWeapon=(hash)=>{
    let ped = GetPlayerPed(-1)
    GiveWeaponToPed(ped, hash, 500, false, false)
    ESX.ShowNotification("Receive : "+ hash)
}

// RegisterNuiCallbackType('main')

// RegisterNUICallback('main', (data)=>{
//     let weapon = data.text
//     GiveWeaponToPed(PlayerPedId(), weapon, 999, false, false)
//     SetDisplay(false)
// })

// RegisterNUICallback('exit', (data)=>{
//     SetDisplay(false)
// })


setTick(async()=>{
    await Wait(1000)
    DrawMarker(1, -292.57, -920.91, 31.08, 0.0, 0.0, 0.0, 0.0, 180.0, 0.0, 2.0, 2.0, 2.0, 255, 128, 0, 50, false, true, 2, null, null, false)
    let CoordsPlayer = GetEntityCoords(GetPlayerPed(-1))
    let Distance = GetDistanceBetweenCoords(CoordsPlayer[0], CoordsPlayer[1], CoordsPlayer[2], -292.57, -920.91, 31.08, true)
    if(Distance < 1.5){
        ESX.ShowHelpNotification("Press [E] To Get Weapon")
        if(IsControlJustPressed(0, 38)){
            SetDisplay(true)
        }
    }
    else{
        SetDisplay(false)
    }
})


let SetDisplay=(bool)=>{
    display = bool
    SetNuiFocus(display, display) //Set Mouse Can move!
    SendNUIMessage(JSON.stringify({ // Send this to index.js to control html
        type: "ui",
        status: display
    }))
}

SetDisplay(display)