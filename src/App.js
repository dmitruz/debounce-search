
import React  from 'react';
import { useCallback, useState } from 'react'
import './App.css';

function App() {
const [search, setSearch] = useState([]);

const debounce = (func) => {
    let timer;
    return function (...args) {
        const context = this;
        if (timer) clearTimeout(timer)
        timer = setTimeout(() => {
            timer = null
            func.apply(context, args);
        }, 500);
    }
}

const handleChange = (e) => {
const { value } = e.target;
fetch(`https://demo.dataverse.org/api/search?q=${value}`)
.then(res => res.json())
.then(json => setSearch(json.data.items));
}

const optimisedVersion = useCallback(debounce(handleChange), [])
return (
        <div className="App">
          
            <input type={'text'} name={'search'} placeholder={'Enter something...'}
            className={'search'} onChange={optimisedVersion}
            />
            {search?.length > 0 && 
            <div className={'autocomplete'}>
                {search?.map((el, i) => 
                    <div key={i} className={'autocompleteItems'}>
                        <span>{el.name}</span>
                    </div>
                )}
            </div>
    }
    
        </div>
    );
}

export default App;
