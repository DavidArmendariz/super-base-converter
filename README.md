# Base converter

Base converter is a NPM Package useful for converting numbers from one base to another.

## Installation

If you are using yarn:

```bash
yarn add super-base-converter
```

If you are using npm:

```bash
npm install super-base-converter
```

## Usage

### Initialize

```javascript
import { BaseConverter } from 'super-base-converter';

const baseConverter = new BaseConverter();
```

### API

**`convertFromBaseNToDecimal(numberToConvert: string, fromBase: number): number`**

Converts a number in base `N` to a decimal number. `numberToConvert` needs to be a string because when `N` is greater than or equal to `10`, we need to use letters.

```javascript
baseConverter.convertFromBaseNToDecimal('101', 2); // returns 5
baseConverter.convertFromBaseNToDecimal('ABC', 16); // returns 2748
baseConverter.convertFromBaseNToDecimal('101.11', 2) // returns 5.75
```

**`convertFromDecimalToBaseN(numberToConvert: number, toBase: number, precision: number = 2): string`**

Converts a decimal number to a number in base `N`.

```javascript
baseConverter.convertFromDecimalToBaseN(173, 16); // returns 'AD'
baseConverter.convertFromDecimalToBaseN(17.6, 3); // returns '122.12'
```

**`convert(numberToConvert: string, convertOptions: object)`**

Converts a number from base `N` to a number in base `M`. The `convertOptions` contains the following properties:

```javascript
convertOptions = {
    fromBase: number;
    toBase: number;
    precision: number = 2;
}
```

```javascript
baseConverter.convert('78', { fromBase: 11, toBase: 6 }) // returns '221'
baseConverter.convert('45.5', { fromBase: 14, toBase: 2 }) // returns '111101.01'
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
