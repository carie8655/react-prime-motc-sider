# react-prime-motc-sider

Source code at https://github.com/carie8655/react-prime-motc-sider

## Installation

    npm install --save react-prime-motc-sider

or

    yarn add react-prime-motc-sider

## Usage

```
import React from 'react';
import MOTCSider from 'react-prime-motc-sider';

function MOTCSiderDemo(){
    return(
        <React.Fragment>
            <div>
                <MOTCSider
                    title="Test"
                    width={250}
                    menu={[]}
                />
            </div>
        </React.Fragment>
    )
}

export default MOTCSiderDemo;
```

## Props

| Name  | Type     | Default |
| ----- | -------- | ------- |
| title | 'string' | ''      |
| width | 'number' | ''      |
| menu  | 'array'  | []      |
