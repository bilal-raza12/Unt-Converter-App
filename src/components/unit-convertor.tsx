"use client";
import { useState, ChangeEvent } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectValue,
  SelectTrigger,
} from "./ui/select";

const conversionRates: Record<string, Record<string, number>> = {
  length: {
    "Millimeters (mm)": 1,
    "Centimeters (cm)": 10,
    "Meters (m)": 1000,
    "Kilometers (km)": 100000,
    "Inches (in)": 25.4,
    "Feet (ft)": 304.8,
    "Yards (yd)": 914.4,
    "Miles (mi)": 160934,
  },

  weight: {
    "Grams (g)": 1,
    "Kilograms (Kg)": 1000,
    "Ounces (oz)": 28.3495,
    "Pounds (lb)": 453.592,
  },

  volume: {
    "Milliliters (ml)": 1,
    "Liters (l)": 1000,
    "Gallons (gal)": 3785.41,
    "Quarts (qt)": 946.353,
    "Pints (pt)": 473.176,
    "Cups (cp)": 240,
    "Fluid Ounces (fl oz)": 29.5735,
  },
};

const unitTypes: Record<string, string[]> = {
  length: [
    "Millimeters (mm)",
    "Centimeters (cm)",
    "Meters (m)",
    "Kilometers (km)",
    "Inches (in)",
    "Feet (ft)",
    "Yards (yd)",
    "Miles (mi)",
  ],
  Weight: ["Grams (g)", "Kilograms (Kg)", "Ounces (oz)", "Pounds (lb)"],

  volume: [
    "Milliliters (ml)",
    "Liters (l)",
    "Gallons (gal)",
    "Quarts (qt)",
    "Pints (pt)",
    "Cups (cp)",
    "Fluid Ounces (fl oz)",
  ],
};

const UnitConvertor = () => {
  const [inputValue, setInputValue] = useState<number | null>(null);
  const [inputUnit, setInputUnit] = useState<string | null>(null);
  const [outputUnit, setOutputUnit] = useState<string | null>(null);
  const [convertedValue, setConvertedValue] = useState<number | null>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(parseFloat(e.target.value));
  };

  const handleInputUnitChange = (value: string): void => {
    setInputUnit(value);
  };

  const handleOutputUnitChange = (value: string): void => {
    setOutputUnit(value);
  };

  const convertValue = (): void => {
    if (inputValue !== null && inputValue && outputUnit) {
      let unitCategory: string | null = null;

      for (const category in unitTypes) {
        if (
          unitTypes[category].includes(inputUnit) &&
          unitTypes[category].includes(outputUnit)
        ) {
          unitCategory = category;
          break;
        }
      }
      if (unitCategory) {
        const baseValue = inputValue * conversionRates[unitCategory][inputUnit];
        const result = baseValue / conversionRates[unitCategory][outputUnit];
        setConvertedValue(result);
      } else {
        setConvertedValue(null);
        alert("Incompatible unit types selected.");
      }
    } else {
      setConvertedValue(null);
      alert("Please fill all fields.");
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="max-w-md w-full p-6 bg-card rounded-lg shadow-lg ">
        <h1 className="text-2xl font-bold mb-1 text-center">Unit Convertor</h1>
        <p className="text-sm mb-8 text-center">
          Convert Values between different units.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="input-unit">From</Label>
            <Select onValueChange={handleInputUnitChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select Unit"></SelectValue>
              </SelectTrigger>
              <SelectContent>
                {Object.entries(unitTypes).map(([category, units]) => (
                  <SelectGroup key={category}>
                    <SelectLabel>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </SelectLabel>
                    {units.map((unit) => (
                      <SelectItem key={unit} value={unit}>
                        {unit}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="output-unit">To</Label>
            <Select onValueChange={handleOutputUnitChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select Unit"></SelectValue>
              </SelectTrigger>
              <SelectContent>
                {Object.entries(unitTypes).map(([category, units]) => (
                  <SelectGroup key={category}>
                    <SelectLabel>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </SelectLabel>
                    {units.map((unit) => (
                      <SelectItem key={unit} value={unit}>
                        {unit}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2 col-span-2">
            <Label htmlFor="input-value">Value</Label>
            <Input
              id="input-value"
              type="number"
              placeholder="Enter Value"
              value={inputValue || ""}
              onChange={handleInputChange}
              className="w-full"
            />
          </div>
          <Button
            onClick={convertValue}
            type="button"
            className="col-span-2 bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            Convert
          </Button>
        </div>

        <div className="mt-6 text-center">
          <div className="text-4xl font-bold">
            {convertedValue !== null ? convertedValue.toFixed(2) : "0"}
          </div>
          <div className="text-muted-foreground">
            {outputUnit ? outputUnit : "Unit"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnitConvertor;
