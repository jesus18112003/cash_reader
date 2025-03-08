import React, { useState, useCallback } from "react";
import useNarrator from "../hooks/useNarrator";

// Mapeo de valores de los billetes
const responseMapping = {
    "fifty-back": { value: 50 },
    "fifty-front": { value: 50 },
    "five-back": { value: 5 },
    "five-front": { value: 5 },
    "one-back": { value: 1 },
    "one-front": { value: 1 },
    "ten-back": { value: 10 },
    "ten-front": { value: 10 },
    "twenty-back": { value: 20 },
    "twenty-front": { value: 20 },
    "one_hundred-back": { value: 100 },
    "one_hundred-front": { value: 100 },
    "fifty-back-vef": { value: 50 },
    "fifty-front-vef": { value: 50 },
    "five-back-vef": { value: 5 },
    "five-front-vef": { value: 5 },
    "ten-back-vef": { value: 10 },
    "ten-front-vef": { value: 10 },
    "twenty-back-vef": { value: 20 },
    "twenty-front-vef": { value: 20 },
    "one_hundred-back-vef": { value: 100 },
    "one_hundred-front-vef": { value: 100 },
    "two_hundred-back-vef": { value: 200 },
    "two_hundred-front-vef": { value: 200 },
};

const SumManager = ({ toggleModel }) => {
    const [total, setTotal] = useState(0); // Estado para el total acumulado
    const [sumMode, setSumMode] = useState(false); // Estado para el modo de suma

    // Función para narrar el total acumulado
    const narrateBillAndTotal = useCallback(
        (label) => {
            if (!responseMapping[label]) return null;

            const billValue = responseMapping[label].value;
            const currency = toggleModel ? "bolívares" : "dólares";
            let message = `${billValue} ${currency}`;

            if (sumMode) {
                setTotal((prev) => prev + billValue);
                message += `, sumando ${billValue}. Total acumulado: ${total + billValue} ${currency}.`;
            }

            return message;
        },
        [sumMode, total, toggleModel]
    );
    // Función para activar/desactivar el modo de suma
    const toggleSumMode = useCallback(() => {
        setSumMode((prev) => !prev);
        const message = sumMode ? "Modo de suma desactivado." : "Modo de suma activado.";
        if (sumMode) {
            return `${message} ${narrateTotal()}`; // Narrar el total al desactivar
        }
        return message;
    }, [sumMode, narrateTotal]);

    // Función para sumar el valor de un billete
    const addToTotal = useCallback(
        (label) => {
            if (sumMode && responseMapping[label]) {
                const value = responseMapping[label].value;
                setTotal((prev) => prev + value);
                return narrateTotal(); // Narrar el nuevo total
            }
            return null;
        },
        [sumMode, narrateTotal]
    );

    // Función para reiniciar el total
    const resetTotal = useCallback(() => {
        setTotal(0);
        return "Total reiniciado.";
    }, []);

    return {
        total,
        sumMode,
        toggleSumMode,
        narrateBillAndTotal,
        resetTotal,
    };
};

export default SumManager;