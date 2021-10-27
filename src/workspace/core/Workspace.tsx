import FlexLayout, {IJsonModel, IJsonTabNode, Layout, Model, TabNode} from "flexlayout-react";
import React, { useRef, useState } from "react";
import LayoutFactory, {LayoutFactoryMethod} from "./LayoutFactory";
import './FlexLayout.scss';
import './Workspace.scss';


export type Toolbar = (layout: React.RefObject<Layout>) => React.ReactNode



const Workspace = (props: {defaultLayout: IJsonModel, factories: LayoutFactoryMethod[], toolbar: Toolbar}) => {
    const [model, setModel] = useState(FlexLayout.Model.fromJson(props.defaultLayout))
    const layoutRef = useRef<Layout>(null);

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
