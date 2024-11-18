let data = [ ];


// 定義一個函式來包裝 API 請求
function fetchData(apiUrl) {
  axios.get(apiUrl)
    .then(function(response){
        data = response.data;
        formatChartA();
        formatChartB();
    })
    .catch(error=>{
        console.log(error.name);
        alert("未正確取得API");
    });
}

//API URL
const apiUrl = 'https://raw.githubusercontent.com/hexschool/2021-ui-frontend-job/master/frontend_data.json';
fetchData(apiUrl);



//一條長條圖：接案公司的薪資滿意度平均分數
function formatChartA(){
    let total = 0;
    let count = 0;
    data.forEach(function(item){
        if (item.company.industry == "接案公司"){
            total += parseInt(item.company.salary_score);
            count ++;
        }
    })
    let score = total / count;

    renderChartA(score);
}
function renderChartA(data){
    const chart = c3.generate({
        bindto: "#chartA",
        data: {
            x: 'x', // 使用 X 軸數據來對應直條的位置
            columns: [
                ['x', '接案公司'], // 定義 X 軸的分類名稱
                ['滿意度', data]   // 定義每個分類對應的數據
            ],
            type: 'bar', //直條圖
            color: function (color, d) {
                // 根據索引分配顏色
                return d.index === 0 ? '#26C0C7' : '#5151D3';
            },
            labels: true // 啟用數值標籤
        },
        size: {
            width: 350
        },
        bar: {
            width:40 //直條圖的寬度
        },
        legend: {
            show: false // 隱藏圖例
        },
        axis: {
            x: {
                type: 'category',
                tick: {
                    centered: true, // 確保分類文字居中
                    multiline: true // 確保顯示較長文字
                    //values: [] // 刻度值設為空，隱藏刻度
                }
            },
            y: {
                max: 9, // 設定 Y 軸的最大值（可選）
                label: {
                    text: "平均分數 (1-10)",
                    position: "outer-top" // 可選：'inner-top', 'outer-top', 'inner-middle', 'outer-middle'
                }
            }
        }
    });

}

//二條長條圖：抓取博弈、電商公司兩個產業滿意度的平均分數
function formatChartB(){
    let totalA = 0;
    let countA = 0;
    data.forEach(function(item){
        if (item.company.industry == "博奕"){            
            totalA += parseInt(item.company.salary_score);
            countA ++;
        }
    })
    let scoreA = (totalA / countA).toFixed(2);

    let totalB = 0;
    let countB = 0;
    data.forEach(function(item){
        if (item.company.industry == "電子商務"){
            totalB += parseInt(item.company.salary_score);
            countB ++;
        }
    })
    let scoreB = (totalB / countB).toFixed(2);

    renderChartB(scoreA, scoreB);
}
function renderChartB(dataA, dataB){
    const chart = c3.generate({
        bindto: "#chartB",
        data: {
            x: 'x', // 使用 X 軸數據來對應直條的位置
            columns: [
                ['x', '博奕', '電子商務'], // 定義 X 軸的分類名稱
                ['滿意度', dataA, dataB]   // 定義每個分類對應的數據
            ],
            type: 'bar', // 設定圖表類型為直條圖
            color: function (color, d) {
                // 根據索引分配顏色
                return d.index === 0 ? '#26C0C7' : '#5151D3';
            },
            labels: true // 啟用數值標籤
        },
        
        size: {
            width: 350
        },
        bar: {
            width: 40,
        },
        legend: {
            show: false // 隱藏圖例
        },
        axis: {
            x: {
                type: 'category',
                tick: {
                    centered: true, // 確保分類文字居中
                    multiline: true // 確保顯示較長文字
                }
            },
            y: {
                max: 9, // 設定 Y 軸的最大值（可選）
                label: {
                    text: "平均分數 (1-10)",
                    position: "outer-top" // 可選：'inner-top', 'outer-top', 'inner-middle', 'outer-middle'
                }
            }
        }
    });

}