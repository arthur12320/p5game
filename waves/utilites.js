checkWaveEnd = function(mobs){
    
    if(mobs.length == 0 && !waveCooldown){
        //wave acabou
        waveCooldown = true
        console.log('wave ended')
        waveNumber++;
        console.log('cw'+waveNumber);
        displayMessage = true;
        messageToDisplay = `wave ${waveNumber} spawning in 20 seconds`
        setTimeout(() => {
            waveCooldown = false;
            displayMessage = false;
            if(mobs.length == 0){
                spawnNextWave(waveNumber,mobs)
            }
        }, 20000);
        
    }
}