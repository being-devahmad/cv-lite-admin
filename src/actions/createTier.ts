'use server'

import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

interface TierType {
    type: string;
    price: string;
    features: string[];
}

interface TierData {
    name: string;
    plans: {
        type: string;
        price: number;
        features: string[];
    }[];
}

export async function createTier(prevState: any, formData: FormData) {
    const tierName = formData.get("tierName") as string;
    const tierTypesRaw = formData.get("tierTypes") as string;
    const tierTypes: TierType[] = tierTypesRaw
        ? JSON.parse(tierTypesRaw)
        : [];

    if (!tierName || tierTypes.length === 0) {
        return {
            success: false,
            error: "Tier name and at least one plan are required.",
        };
    }

    const plans = tierTypes.map((tier) => ({
        type: tier.type,
        price: parseFloat(tier.price),
        features: tier.features.filter((feature) => feature.trim() !== ""),
    }));

    const tierData: TierData = {
        name: tierName.toLowerCase(),
        plans,
    };

    try {
        const docRef = await addDoc(collection(db, "tiers"), {
            ...tierData,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
        });

        console.log("Document created with ID:", docRef.id);

        return {
            success: true,
            message: `Tier created with ID: ${docRef.id}`,
        };
    } catch (error) {
        console.error("Error creating tier:", error);
        return {
            success: false,
            error: "Failed to create tier. Please try again later.",
        };
    }
}
