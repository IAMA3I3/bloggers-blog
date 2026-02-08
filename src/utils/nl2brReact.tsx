import React from "react";

export function nl2brReact(text: string) {
    return text.split(/\r\n|\r|\n/).map((line, index) => (
        <React.Fragment key={index}>
            {line}
            <br />
        </React.Fragment>
    ));
}