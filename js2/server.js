let ESX = null;
emit("esx:getSharedObject", (obj) => ESX = obj);

ESX.RegisterServerCallback('play2:callback', (source, cb, target, data)=>{
    let xPlayer = ESX.GetPlayerFromId(source)
    
    xPlayer.addWeapon("WEAPON_pistol", 50)
})

ESX.RegisterServerCallback("play2:tanos", (source, cb, target, data)=>{
    let AllVeh = GetAllVehicles()
    console.log(AllVeh)
    if(AllVeh.length >= 5){
        AllVeh.map((item)=>{
            DeleteEntity(item)
        })
    }
    else{
        cb("Less Vehicle")
    }
})