let ESX = null

emit('esx:getSharedObject', (obj) => {
    ESX = obj
})

RegisterCommand('Heal', () => {
    const ped = GetPlayerPed(-1)
    console.log(ped)
    SetEntityHealth(ped, 150)
})

RegisterCommand("Fuel", () => {
    let Vehicle = GetVehiclePedIsIn(GetPlayerPed(-1))
    SetVehicleFuelLevel(Vehicle, 100)
    ESX.ShowNotification("Set Fuel Max")
})

RegisterCommand("Food", () => {
    emitNet('esx_basicneeds:updateStatus', 'hunger', 1000000)
    emitNet('esx_basicneeds:updateStatus', 'thirst', 1000000)
    ESX.ShowNotification("Set Status Full")
})

RegisterCommand("Time", ()=>{
    let time = GetGameTimer()
    console.log(time)
})


RegisterCommand("weather", (source, args) => {
    let weather = ESX.DumpTable(args[0])
    ESX.ShowNotification(weather)
    SetWeatherTypePersist(weather)
    SetWeatherTypeNowPersist(weather)
    SetWeatherTypeNow(weather)
    SetOverrideWeather(weather)
})

let Wait = async (ms) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {

        }, ms)
        resolve()
    })
}


let nightstatus = false

RegisterCommand('autopilot', ()=>{
    let autpilot = false
    let target = GetFirstBlipInfoId(8)
    if(target != null && target != 0){
        let coords = GetBlipCoords(target)
        console.log(coords)
        TaskVehicleDriveToCoordLongrange(GetPlayerPed(-1), GetVehiclePedIsIn(GetPlayerPed(-1)), coords[0], coords[1], coords[2], 50, 447, 2.0)
        autpilot = true
    }
    else{
        ESX.ShowNotification("Give Direction before")
    }
})

RegisterCommand('clearautopilot', ()=>{
    RemoveBlip()
    ClearPedTasks(PlayerPedId())
})


RegisterCommand("tanos", ()=>{
    ESX.TriggerServerCallback("play2:tanos", (data)=>{
        ESX.ShowNotification(data)
    })
})


RegisterCommand("blackout", ()=>{
    setTick(async()=>{
        await Wait(1000)
        SetArtificialLightsState(true)
    })
})

RegisterCommand("blackoutClear", ()=>{
    setTick(async()=>{
        await Wait(1000)
        SetArtificialLightsState(false)
    })
})


setTick(async()=>{
    await Wait(1000)
    let Veh = GetVehiclePedIsIn(GetPlayerPed(-1))
    let wheel_lf = IsVehicleTyreBurst(Veh, 0)
    let wheel_rf = IsVehicleTyreBurst(Veh, 1)
    let wheel_lr = IsVehicleTyreBurst(Veh, 4)
    let wheel_rr = IsVehicleTyreBurst(Veh, 5)
    if(Veh){
        if(wheel_lf == 1 && wheel_rf == 1 && wheel_lr == 1 && wheel_rr == 1){
            // SetVehicleEngineHealth(Veh, -4000)
            setTimeout(()=>{
                SetVehicleEngineOn(Veh, false, false, true)
            }, 5000)
        }
    }
})


setTick(async()=>{
    await Wait(1000)
    SetMinimapClipType(1)
    if(IsControlJustPressed(0, 47)){
        if(!nightstatus){
            nightstatus = true
            SetNightvision(nightstatus)
        }
        else{
            nightstatus = false
            SetNightvision(nightstatus)
        }
    }
})


setTick(async()=>{
    await Wait(1000)
    let Vehicle = GetVehiclePedIsIn(GetPlayerPed(-1))
    let CurrentSpeed = GetEntitySpeed(Vehicle) * 2.236936
    SetWeaponsNoAutoreload(true)
    if(CurrentSpeed > 10){
        EnableAllControlActions(0)
    }
})

setTick(async () => {
    await Wait(1000)
    let CoordsPlayer = GetEntityCoords(GetPlayerPed(-1))
    let Distance = GetDistanceBetweenCoords(CoordsPlayer[0], CoordsPlayer[1], CoordsPlayer[2], -296.25, -919.91, 31.08, true)
    DrawMarker(1, -296.25, -919.91, 31.08, 0.0, 0.0, 0.0, 0.0, 180.0, 0.0, 2.0, 2.0, 2.0, 255, 128, 0, 50, false, true, 2, null, null, false)
    let blip = AddBlipForCoord(-296.25, -919.91)
    SetBlipSprite(blip, 439)
    SetBlipDisplay(blip, 6)
    SetBlipScale(blip, 1.5)
    BeginTextCommandSetBlipName("Yellow Land")
    EndTextCommandSetBlipName(blip)
    SetBlipColour(blip, "#8f8d79")
    Set
    if (Distance < 1.5) {
        ESX.ShowHelpNotification("Press [E] To Get Something")
        if (IsControlJustPressed(0, 38)) {
            ESX.TriggerServerCallback("play2:callback")
        }
    }
})

setTick(async () => {
    await Wait(1000)
    EnableCrosshairThisFrame()
    ShowHudComponentThisFrame(14)
    ShowHudComponentThisFrame(8)
    let Vehicle = GetVehiclePedIsIn(GetPlayerPed((-1)))
    SetVehicleEngineHealth(Vehicle, 1000)
    let bodyVeh = GetVehicleBodyHealth(Vehicle)
    if(bodyVeh-5 < bodyVeh){
        ShakeGameplayCam("DRUNK_SHAKE", 1.0)
    }
    if (Vehicle) {
        // console.log("Engine = ", GetVehicleBodyHealth(Vehicle))
        // console.log("Body = ", GetVehicleBodyHealth(Vehicle))
        // console.log("Bumper = ", IsVehicleBumperBouncing(Vehicle))
        if (IsControlJustReleased(0, 38)) {
            SetVehicleNitroEnabled(Vehicle, true)
        }
    }
    // console.log(Vehicle)
})