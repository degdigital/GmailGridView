(function(window) {
  
  window.SummitChart = {};

  window.SummitChart.options = {
    title:"How much profit is there in a $291 sale?",
    backgroundColor: '#4E4E50',
    pieSliceTextStyle: {
        color: '#333333'
    },
    titleTextStyle: {
        color: 'white',
        fontName: 'Georgia',
        fontSize: '18'
    },
    legend: {
        textStyle: {
            color: 'white',
            fontName: 'Georgia',
            fontSize: '16'
        },
        alignment: 'center'
    },
    pieSliceTextStyle: {
        fontName: 'Georgia'
    },
    pieSliceBorderColor: 'transparent',
    slices: {
        0: { 
          color: '#EBE0CF',
          textStyle: {
            color: '#333333' 
          }
        },
        1: { 
          color: '#D4495D',
          textStyle: {
             color: 'white'
          }
        },
        2: { 
          color: '#A8C9D1' 
        },
        3: {
          color: '#333333'
        }
    }
  }
})(window);
