import { CategoryDefinition, UnitDefinition } from './types';
import { 
  Ruler, Weight, Clock, Thermometer, BoxSelect, Cylinder, 
  Activity, Gauge, Zap, Battery, Database, DollarSign,
  Compass, Radio, Hammer, Network, Fuel
} from 'lucide-react';

const linearUnit = (id: string, name: string, symbol: string, factor: number): UnitDefinition => ({
  id,
  name,
  symbol,
  factor,
  toBase: (v) => v * factor,
  fromBase: (v) => v / factor,
});

export const CATEGORIES: CategoryDefinition[] = [
  {
    id: 'length',
    name: 'Length',
    icon: <Ruler className="w-5 h-5" />,
    baseUnitId: 'm',
    units: [
      linearUnit('m', 'Meter', 'm', 1),
      linearUnit('km', 'Kilometer', 'km', 1000),
      linearUnit('cm', 'Centimeter', 'cm', 0.01),
      linearUnit('mm', 'Millimeter', 'mm', 0.001),
      linearUnit('mi', 'Mile', 'mi', 1609.344),
      linearUnit('yd', 'Yard', 'yd', 0.9144),
      linearUnit('ft', 'Foot', 'ft', 0.3048),
      linearUnit('in', 'Inch', 'in', 0.0254),
    ]
  },
  {
    id: 'mass',
    name: 'Mass',
    icon: <Weight className="w-5 h-5" />,
    baseUnitId: 'kg',
    units: [
      linearUnit('kg', 'Kilogram', 'kg', 1),
      linearUnit('g', 'Gram', 'g', 0.001),
      linearUnit('mg', 'Milligram', 'mg', 0.000001),
      linearUnit('ton', 'Metric Ton', 't', 1000),
      linearUnit('lb', 'Pound', 'lb', 0.45359237),
      linearUnit('oz', 'Ounce', 'oz', 0.0283495),
    ]
  },
  {
    id: 'temperature',
    name: 'Temperature',
    icon: <Thermometer className="w-5 h-5" />,
    baseUnitId: 'c',
    units: [
      {
        id: 'c',
        name: 'Celsius',
        symbol: '°C',
        toBase: (v) => v,
        fromBase: (v) => v,
      },
      {
        id: 'f',
        name: 'Fahrenheit',
        symbol: '°F',
        toBase: (v) => (v - 32) * (5/9),
        fromBase: (v) => (v * 9/5) + 32,
      },
      {
        id: 'k',
        name: 'Kelvin',
        symbol: 'K',
        toBase: (v) => v - 273.15,
        fromBase: (v) => v + 273.15,
      },
    ]
  },
  {
    id: 'time',
    name: 'Time',
    icon: <Clock className="w-5 h-5" />,
    baseUnitId: 's',
    units: [
      linearUnit('s', 'Second', 's', 1),
      linearUnit('min', 'Minute', 'min', 60),
      linearUnit('h', 'Hour', 'h', 3600),
      linearUnit('d', 'Day', 'd', 86400),
      linearUnit('wk', 'Week', 'wk', 604800),
      linearUnit('mo', 'Month (Avg)', 'mo', 2628000),
      linearUnit('y', 'Year', 'y', 31536000),
    ]
  },
  {
    id: 'area',
    name: 'Area',
    icon: <BoxSelect className="w-5 h-5" />,
    baseUnitId: 'm2',
    units: [
      linearUnit('m2', 'Square Meter', 'm²', 1),
      linearUnit('km2', 'Square Kilometer', 'km²', 1e6),
      linearUnit('cm2', 'Square Centimeter', 'cm²', 0.0001),
      linearUnit('ha', 'Hectare', 'ha', 10000),
      linearUnit('ft2', 'Square Foot', 'ft²', 0.092903),
      linearUnit('ac', 'Acre', 'ac', 4046.86),
    ]
  },
  {
    id: 'volume',
    name: 'Volume',
    icon: <Cylinder className="w-5 h-5" />,
    baseUnitId: 'l',
    units: [
      linearUnit('l', 'Liter', 'L', 1),
      linearUnit('ml', 'Milliliter', 'mL', 0.001),
      linearUnit('m3', 'Cubic Meter', 'm³', 1000),
      linearUnit('cm3', 'Cubic Centimeter', 'cm³', 0.001),
      linearUnit('gal', 'Gallon (US)', 'gal', 3.78541),
      linearUnit('qt', 'Quart (US)', 'qt', 0.946353),
      linearUnit('pt', 'Pint (US)', 'pt', 0.473176),
    ]
  },
  {
    id: 'angle',
    name: 'Angle',
    icon: <Compass className="w-5 h-5" />,
    baseUnitId: 'deg',
    units: [
      linearUnit('deg', 'Degree', '°', 1),
      linearUnit('rad', 'Radian', 'rad', 57.29578),
      linearUnit('grad', 'Gradian', 'grad', 0.9),
      linearUnit('arcmin', 'Arcminute', '′', 1/60),
      linearUnit('arcsec', 'Arcsecond', '″', 1/3600),
    ]
  },
  {
    id: 'speed',
    name: 'Speed',
    icon: <Activity className="w-5 h-5" />,
    baseUnitId: 'ms',
    units: [
      linearUnit('ms', 'Meter/Second', 'm/s', 1),
      linearUnit('kmh', 'Kilometer/Hour', 'km/h', 0.277778),
      linearUnit('mph', 'Mile/Hour', 'mph', 0.44704),
      linearUnit('kn', 'Knot', 'kn', 0.514444),
    ]
  },
  {
    id: 'frequency',
    name: 'Frequency',
    icon: <Radio className="w-5 h-5" />,
    baseUnitId: 'hz',
    units: [
      linearUnit('hz', 'Hertz', 'Hz', 1),
      linearUnit('khz', 'Kilohertz', 'kHz', 1000),
      linearUnit('mhz', 'Megahertz', 'MHz', 1e6),
      linearUnit('ghz', 'Gigahertz', 'GHz', 1e9),
      linearUnit('rpm', 'RPM', 'rpm', 1/60),
    ]
  },
  {
    id: 'force',
    name: 'Force',
    icon: <Hammer className="w-5 h-5" />,
    baseUnitId: 'n',
    units: [
      linearUnit('n', 'Newton', 'N', 1),
      linearUnit('kn_f', 'Kilonewton', 'kN', 1000),
      linearUnit('dyn', 'Dyne', 'dyn', 0.00001),
      linearUnit('lbf', 'Pound-force', 'lbf', 4.44822),
      linearUnit('kgf', 'Kilogram-force', 'kgf', 9.80665),
    ]
  },
  {
    id: 'pressure',
    name: 'Pressure',
    icon: <Gauge className="w-5 h-5" />,
    baseUnitId: 'pa',
    units: [
      linearUnit('pa', 'Pascal', 'Pa', 1),
      linearUnit('bar', 'Bar', 'bar', 100000),
      linearUnit('psi', 'PSI', 'psi', 6894.76),
      linearUnit('atm', 'Atmosphere', 'atm', 101325),
    ]
  },
  {
    id: 'energy',
    name: 'Energy',
    icon: <Battery className="w-5 h-5" />,
    baseUnitId: 'j',
    units: [
      linearUnit('j', 'Joule', 'J', 1),
      linearUnit('kj', 'Kilojoule', 'kJ', 1000),
      linearUnit('cal', 'Calorie', 'cal', 4.184),
      linearUnit('kcal', 'Kilocalorie', 'kcal', 4184),
      linearUnit('wh', 'Watt-hour', 'Wh', 3600),
      linearUnit('kwh', 'Kilowatt-hour', 'kWh', 3.6e6),
    ]
  },
  {
    id: 'power',
    name: 'Power',
    icon: <Zap className="w-5 h-5" />,
    baseUnitId: 'w',
    units: [
      linearUnit('w', 'Watt', 'W', 1),
      linearUnit('kw', 'Kilowatt', 'kW', 1000),
      linearUnit('mw', 'Megawatt', 'MW', 1e6),
      linearUnit('hp', 'Horsepower', 'hp', 745.7),
    ]
  },
  {
    id: 'data',
    name: 'Data Storage',
    icon: <Database className="w-5 h-5" />,
    baseUnitId: 'b',
    units: [
      linearUnit('b', 'Byte', 'B', 1),
      linearUnit('kb', 'Kilobyte', 'KB', 1024),
      linearUnit('mb', 'Megabyte', 'MB', 1048576),
      linearUnit('gb', 'Gigabyte', 'GB', 1073741824),
      linearUnit('tb', 'Terabyte', 'TB', 1099511627776),
    ]
  },
  {
    id: 'transfer',
    name: 'Data Transfer',
    icon: <Network className="w-5 h-5" />,
    baseUnitId: 'bps',
    units: [
      linearUnit('bps', 'Bit per sec', 'bps', 1),
      linearUnit('kbps', 'Kilobit per sec', 'Kbps', 1000),
      linearUnit('mbps', 'Megabit per sec', 'Mbps', 1e6),
      linearUnit('gbps', 'Gigabit per sec', 'Gbps', 1e9),
      linearUnit('mbs', 'Megabyte per sec', 'MB/s', 8e6),
    ]
  },
  {
    id: 'fuel',
    name: 'Fuel Consumption',
    icon: <Fuel className="w-5 h-5" />,
    baseUnitId: 'kml',
    units: [
      linearUnit('kml', 'Kilometer/Liter', 'km/L', 1),
      linearUnit('mpg_us', 'MPG (US)', 'mpg (US)', 0.425144),
      linearUnit('mpg_uk', 'MPG (UK)', 'mpg (UK)', 0.354006),
      {
        id: 'l100km',
        name: 'Liters/100km',
        symbol: 'L/100km',
        // L/100km is inverse: 100 / x = km/L. 
        // Logic: Input (L/100km) -> Base (km/L). x -> 100/x
        toBase: (v) => v === 0 ? 0 : 100 / v,
        // Logic: Base (km/L) -> Output (L/100km). x -> 100/x
        fromBase: (v) => v === 0 ? 0 : 100 / v,
      },
    ]
  },
  {
    id: 'currency',
    name: 'Currency (Est.)',
    icon: <DollarSign className="w-5 h-5" />,
    baseUnitId: 'usd',
    units: [
      linearUnit('usd', 'US Dollar', '$', 1),
      linearUnit('eur', 'Euro', '€', 1.09),
      linearUnit('gbp', 'British Pound', '£', 1.27),
      linearUnit('jpy', 'Japanese Yen', '¥', 0.0068),
      linearUnit('cny', 'Chinese Yuan', '¥', 0.14),
      linearUnit('inr', 'Indian Rupee', '₹', 0.012),
      linearUnit('cad', 'Canadian Dollar', 'C$', 0.74),
    ]
  }
];