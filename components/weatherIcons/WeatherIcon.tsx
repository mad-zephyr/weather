import Sunny from './assets/day.svg'
import PartlyCloudy from './assets/cloudy-day-1.svg'
import Overcast from './assets/rainy-2.svg'
import Cloudy from './assets/cloudy-day-1.svg'
import Mist from './assets/cloudy-day-2.svg'
import PatchyRainNearby from './assets/rainy-1.svg'
import PatchySnowNearby from './assets/snowy-1.svg'
import PatchySleetNearby from './assets/rainy-7.svg'
import PatchyFreezingDrizzleNearby from './assets/snowy-5.svg'
import ThunderyOutbreaksInNearby from './assets/thunder.svg'
import BlowingSnow from './assets/snowy-5.svg'
import Blizzard from './assets/snowy-3.svg'
import ModerateOrHeavySnow from './assets/thunder.svg'
import PatchyLightDrizzle from './assets/snowy-1.svg'
import LightDrizzle from './assets/rainy-1.svg'
import HeavyFreezingDrizzle from './assets/snowy-4.svg'
import PatchyLightRain from './assets/rainy-1.svg'
import ModerateRain from './assets/rainy-3.svg'
import LightSleet from './assets/rainy-7.svg'
import LightSleetShowers from './assets/rainy-1.svg'
import PatchyLightSnow from './assets/snowy-2.svg'
import PatchyModerateSnow from './assets/snowy-3.svg'
import PatchyHeavySnow from './assets/snowy-5.svg'
import HeavyRain from './assets/rainy-6.svg'
import { WeatherIconProps } from './WeatherIcon.props'

export const WeatherIcon: React.FC<WeatherIconProps> = ({ iconCode }: WeatherIconProps): JSX.Element => {

  switch (iconCode) {
    case 1000:
        return <Sunny />
    case 1003:
        return <PartlyCloudy />
    case 1006: 
        return <Cloudy />
    case 1009: 
        return <Overcast />
    case 1030: 
        return <Mist/>
    case 1063: 
        return <PatchyRainNearby/>
    case 1066: 
        return <PatchySnowNearby/>
    case 1069: 
        return <PatchySleetNearby/>
    case 1072: 
        return <PatchyFreezingDrizzleNearby/>
    case 1087: 
        return <ThunderyOutbreaksInNearby/>
    case 1114: 
        return <BlowingSnow/>
    case 1117: 
        return <Blizzard/>
    case 1135: 
        return <Blizzard/>
    case 1147: 
        return <Blizzard/>
    case 1150: 
        return <PatchyLightDrizzle/>
    case 1153: 
        return <LightDrizzle/>
    case 1168: 
        return <LightDrizzle/>
    case 1171: 
        return <HeavyFreezingDrizzle/>
    case 1180: 
      return <PatchyLightRain />
    case 1183: 
        return <PatchyLightRain/>
    case 1186: 
        return <PatchyLightRain/>
    case 1189: 
        return <ModerateRain/>
    case 1192: 
        return <HeavyRain/>
    case 1195: 
        return <HeavyRain/>
    case 1198: 
        return <PatchyLightRain/>
    case 1201: 
        return <PatchyLightRain/>
    case 1204: 
        return <LightSleet/>
    case 1207: 
        return <LightSleetShowers/>
    case 1210: 
        return <PatchyLightSnow/>
    case 1213: 
        return <PatchyLightSnow/>
    case 1216: 
        return <PatchyModerateSnow/>
    case 1219: 
        return <PatchyModerateSnow/>
    case 1219: 
        return <PatchyHeavySnow/>
    case 1225: 
        return <PatchyHeavySnow/>
    case 1237: 
        return <PatchyHeavySnow/>
    case 1240: 
        return <LightSleetShowers/>
    case 1243: 
        return <PatchyHeavySnow/>
    case 1246: 
        return <LightSleetShowers/>
    case 1249: 
        return <LightSleetShowers/>
    case 1252: 
        return <ModerateOrHeavySnow/>
    case 1255: 
        return <ModerateOrHeavySnow/>
    case 1258: 
        return <ModerateOrHeavySnow/>
    case 1261: 
        return <ModerateOrHeavySnow/>
    case 1264: 
        return <ModerateOrHeavySnow/>
    case 1273: 
        return <ModerateOrHeavySnow/> 
    case 1276: 
        return <ModerateOrHeavySnow/> 
    case 1279: 
        return <ModerateOrHeavySnow/>
    case 1282:
      return <ModerateOrHeavySnow /> 
    default:
      return <></>
  }
}