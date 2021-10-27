import { TabNode } from "flexlayout-react";
import React from "react";


export type LayoutFactoryMethod = (node: TabNode) => React.ReactNode



/**
 * Central factory method that calls all sub factories
 **/

export default (subFactories: LayoutFactoryMethod[]): LayoutFactoryMethod => {
    return (node: TabNode): React.ReactNode => {
        let value = undefined;

        for (const factory of subFactories) {
            value = factory(node)
            if (value !== undefined) break;
        }

        return value;
    }
}