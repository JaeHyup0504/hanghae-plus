### 🛠 Tab 버튼 구현

```js
import React, { Children } from "react";
import clsx from "clsx";

interface TabsProps {
  children?: React.ReactNode;
  value: string | undefined;
  onClick?: (value: string | undefined) => void;
}

interface TabProps extends TabsProps {
  selectedTab?: string | undefined;
}

export const Tabs = ({ children, onClick, value }: TabsProps) => {
  return (
    <div className="w-full min-h-[30px] flex flex-row gap-[40px] mx-[5px]">
      {Children.toArray(children).map((child, idx) => (
        <Tab
          key={idx}
          selectedTab={value}
          value={(child as React.ReactElement<TabProps>).props.value}
          onClick={onClick}
        />
          {(child as React.ReactElement<TabProps>).props.children}
        </Tab>
      ))}
    </div>
  );
};

export const Tab = ({ children, value, selectedTab, onClick }: TabProps) => {
  const handleClick = () => {
    onClick && onClick(value);
  };
  const boolean = value === selectedTab;

  return (
    <>
      <div
        onClick={handleClick}
        className="h-full w-auto cursor-pointer flex items-center"
      >
        <p
          className={clsx("mb-0", {
            "text-textBlue": boolean,
            "font-semibold": boolean,
            "text-textSecondary": !boolean,
          })}
        >
          {children}
        </p>
      </div>
    </>
  );
};
```

### 💻 Tab 버튼 사용법

```js
import { Tab, Tabs } from "../Common/Tabs";
import Preview from "./Components/Preview";
import Raw from "./Components/Raw";

...

const [selectedTab, setSelectedTab] = useState<string | undefined>("preview");

const handleTabClick = (value?: string | undefined) => {
   setSelectedTab(value);
 };

return (
   <>
        ...
       <div className="w-full h-full flex flex-col gap-[10px]">
         <Tabs value={selectedTab} onClick={handleTabClick}>
           <Tab value="preview">Preview</Tab>
           <Tab value="raw">Raw</Tab>
         </Tabs>
         {selectedTab === "preview" && <Preview />}
         {selectedTab === "raw" && <Raw />}
       </div>
       ...
   </>
 );
```

### 💡 기대 효과

재사용성과 유지보수성을 향상시킬 수 있었습니다.

### 🔥 개선점

지금 Tab 컴포넌트는 선택된 Tab 정보만 필요하기 때문에 간단하지만 만약 추가적인 요구 사항이 생긴다면 복잡해질 수 있습니다. 그렇게 된다면 Props drilling을 유발할 수 있습니다. 이를 개선하기 위해 useContext를 사용하여 컴포넌트 트리 내부에서 전역적으로 데이터를 공유할 수 있습니다.
