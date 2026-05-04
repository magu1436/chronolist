import { useState } from "react"

function* generateTempId() {
    let id = -1;
    while (true) {
        yield id;
        id -= 1;
    }
}

const useRegisterTemplateBlock = () => {
    const tempIdGenerator = generateTempId();
    const [ id, setId ] = useState(0);
    const [ isLoading, setLoading ] = useState(false);
}