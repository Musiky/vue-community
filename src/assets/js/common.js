export const checkCollected = (collectedTopicsArr, curTopicid) => {
    function contains(arr, obj) {
        let i = arr.length;
        while (i--) {
            if (arr[i].id === obj) {
                return true
            }
        }
        return false
    };

    if (contains(collectedTopicsArr, curTopicid)) {
        this.SUC_COLLECT()
    } else {
        this.DEL_COLLECTED()
    }
}