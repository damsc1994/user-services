module.exports = {
    compareFunc: (actual = [], expect = []) => {
        let result = null;
        return new Promise((resolve, reject) => {
            for (let i = 0; i < actual.length; i++) {
                const actualValue = actual[i];
                for (let j = 0; j < expect.length; j++) {
                    const expectValue = expect[j];
                    if (actualValue === expectValue) {
                        result = actualValue;
                        break;
                    }

                }
                if (result) break;
            }

            return resolve(result);
        });

    }
}