import Hook, { IHook } from '../models/hook'
import axios from 'axios'



export const notifySubscribers = async (fishCatch: any) => {
    const hooks = await Hook.getAll()

    const links = hooks.filter(hook => checkLakeFilter(hook, fishCatch) && checkSpeciesFilter(hook, fishCatch)).map(h  => h.url)

    for (const url of links) {
        try {
            const res = await axios({
                url,
                data: fishCatch, 
                method: 'POST',
                timeout: 1000
            })

            if (res.status === 200) {
                console.log(`hook was successfully sent to: ${url}`)
            }


        } catch (error) {
            console.error(error.status)
        }
    }

}

const checkSpeciesFilter = (hook: IHook, fishCatch: any) => {
    if (hook.catch_event_species_filter) {
        if (hook.catch_event_species_filter === fishCatch.fishSpecies) {
            return true
        }
        return false
    }
   return true
}

const checkLakeFilter = (hook: IHook, fishCatch: any) => {
    if (hook.catch_event_lake_filter) {
        if (hook.catch_event_lake_filter === fishCatch.location.lake) {
            return true
        }
        return false
    }
   return true
}

