import React from "react";

const LabelInput = ({ label, item, setItem }: any) => {
    // const inputRef = React.useRef<HTMLInputElement>(null);
    // const divRef = React.useRef<HTMLLabelElement>(null);
    const inputRef = React.createRef<HTMLInputElement>();
    const divRef = React.createRef<HTMLLabelElement>();
    // const inputRef = React.useRef<any>(null);
    // const divRef = React.useRef<any>(null);
    const [isFocused, setIsFocused] = React.useState<boolean>(false);

    React.useEffect(() => {
        if (divRef !== null) {
            if (item !== "") {
                divRef!.current?.classList.add("focus");
            }
            if (isFocused) {
                divRef!.current?.classList.add("focus");
            } else if (!isFocused && inputRef!.current?.value !== "") {
            } else {
                divRef!.current?.classList.remove("focus");
            }
        }
    }, [isFocused, item]);

    return (
        <div className="LabelInput_item">
            <label ref={divRef} onClick={() => inputRef!.current?.focus()} className="LabelInput_item_label">
                {label}
            </label>
            <input ref={inputRef} maxLength={140} onClick={() => inputRef!.current?.focus()} onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)} className="LabelInput_item_input" value={item} onChange={(e) => setItem(e.target.value)} type="text" />
        </div>
    );
};

export default LabelInput;
