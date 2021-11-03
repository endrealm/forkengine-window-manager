import FlexLayout, {IJsonModel, IJsonTabNode, Layout, Model, TabNode} from "flexlayout-react";
import React, {useEffect, useRef, useState} from "react";
import LayoutFactory, {LayoutFactoryMethod} from "./LayoutFactory";
import './FlexLayout.scss';
import './Workspace.scss';
import { Observable } from "rx";


export type Toolbar = (layout: React.RefObject<Layout>) => React.ReactNode

export type TabOptions = {
    tab: IJsonTabNode,
    tabSetId: string | null
}




const Workspace = (props: {defaultLayout: IJsonModel, factories: LayoutFactoryMethod[], toolbar: Toolbar, createTab: Observable<TabOptions>}) => {
    const [model, setModel] = useState(FlexLayout.Model.fromJson(props.defaultLayout))
    const layoutRef = useRef<Layout>(null);

    useEffect(() => {
        const subscription = props.createTab.subscribe(options => {
            if(!layoutRef.current) return

            if(options.tabSetId) {
                layoutRef.current.addTabToTabSet(options.tabSetId, options.tab)
            } else {
                layoutRef.current.addTabToActiveTabSet(options.tab)
            }
        })

        return () => {
            subscription.dispose()
        }
    }, [props.createTab])

    return (
        <div className="workspace">
            {props.toolbar(layoutRef)}
            <div className="contents">
                <Layout ref={layoutRef} model={model} onModelChange={change => setModel(change)} factory={LayoutFactory(props.factories)}/>
            </div>
        </div>
    );
};

export default Workspace;
