let ESX = null
emit("esx:getSharedObject", (obj)=>{
    ESX = obj
})


ESX.RegisterServerCallback('play2:inven', (source, cb, target, data)=>{
    let xPlayer = ESX.GetPlayerFromId(source)
    let inven = xPlayer.getInventory()
    let money = xPlayer.getMoney()
    let loadout = xPlayer.getLoadout()
    cb(JSON.stringify({
        inven: inven,
        loadout: loadout,
        money: money
    }))
})