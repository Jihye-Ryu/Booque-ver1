/**
 * 
 */
 
  window.addEventListener('DOMContentLoaded', () => {
   readCartDesc();

  
    
    

    
   function readCartDesc(){
        const userid = document.querySelector('#userId').value;
        
        axios.get('api/cart/all/' + userid) 
        .then(response => { updateCartList(response.data)
        
        })
        .catch(err => {console.log(err) });
        
        console.log('전체 페이지 읽기 ajax 함수')
        
    };
    
    function updateCartList(data){
        console.log('카트 리스트 전체 보기 함수 data 받음 ')
        const divCart = document.querySelector('#cList')
        let str = '';
        
        str += ' <form id="formCheck" mehtod="post">' 
        +'<table class="w-100 table" style="text-align: center;"> '
        + '<thead class="table-light"> '
         +  '  <tr> '
          +      ' <th colspan="2">도서 정보</th> '
           +   '   <th>수량</th> '
            +  '   <th>배송비</th> '
            +  '  <th></th> '
          + '  </tr> '
      + '  </thead> '
     + '   <tbody style="height: 200px;"> ';
        
        
        for(let c of data){
        
      str  += '<tr>'
            +  '<td class="align-middle">' 
            +   ' <input type="checkbox"  id="ckBox" style="width: 30px;"  name="cartId"  value="'+ c.cartId +'"/>' 
            +   ' <img src="' + c.image +'" style="width: 150px;"/></td>' 
            +   ' <td class="align-middle" style="text-align: left;">' 
            +              '  <small class="d-inline-flex px-2 my-1 border rounded text-secondary">' 
            +                 '   <span>'+c.group+'</span><span> / </span><span>'+c.category+'</span>' 
            +              '  </small>' 
            +              '  <div class="h5">'+c.title+'</div>' 
            +             '   <div >'+c.author+'</div>' 
            +              '  <div>'+c.prices 
            +                '    <span>원</span>' 
            +                 '   <small class="px-1 border border-primary rounded text-primary">p</small>' 
            +                  '  <small class="text-primary">'+c.prices*0.05+'</small> ' 
            +               ' </div>' 
            +  '  </td>' 

            +  '  <td class="align-middle">' 
            +      '  <input type="button" class="btnPlusMinus"  value="+"/>' 
            +     '   <span style="width: 50px" id="countS" >'+c.count +' </span>' 
            +       ' <input type="button" class="btnPlusMinus"  value="-"/>' 
    

            +  '  <div class="selectPrice">' 
            +      '  <div id="price" >' 
            +        '<span>'+c.prices +'</span>' + '<span>원</span>' 
            +     '   </div>' 
            +   ' </div>' 
            +  '  </td>' 
            +  '  <td class="align-middle">30,000원 이상<br/>' 
            +   '     배송비 무료</td>' 
            +  '  <td class="align-middle">' 
            +  '  </td>'
            + '</tr>'; 
        }
        
       str 
            += '</tbody>'
            + '</table>'
            +   ' </form>' ;
            
        divCart.innerHTML = str;
        
        const buttons = document.querySelectorAll('.btnPlusMinus');
        console.log('플러스 마이너스 버튼')
        
        buttons.forEach(btn => {
            
            btn.addEventListener('click', e => {
                const td = btn.closest('td');
                const span = td.querySelector('span');
                console.log(td);
                console.log(span)
                
                
                let number = span.innerText;
                
                const type = btn.value;
                if (type == '+') {
                    number = parseInt(number) + 1;
                    
                } else {
                    number = parseInt(number) - 1;
                    if(number == 0){
                       alert('수량은 0이하가 되지 못합니다.')
                       return;
                   }
                }
                span.innerText = number;
                
                const allPrices = document.querySelectorAll('#price')
                console.log(allPrices.length)
                allPrices.forEach(p => {
                    const span = p.querySelector('span') // 가격만  span#id를 통해서 값 찾기.. 
                    let pr = span.innerText;
                    console.log(pr)
                    
                    
                    
                    
                })
                
                
                
            });
        });
        
    
        const form = document.querySelector('#formCheck')
            // 결제창으로 넘어감.
        const btnOrder = document.querySelector('#btnOrder')
        btnOrder.addEventListener('click', function() {
            form.action = '/order';
            form.method = 'post';
            form.submit();

            console.log('누름')
         
        });
    
    
    
    
    
    
    }
    
    
    
    const btnDelete = document.querySelector('#btnDelete')
    
    btnDelete.addEventListener('click', function(){
    const userId = document.querySelector('#userId').value;
    console.log(userId)
    
    const list = document.querySelectorAll('#ckBox');
    let ckList = [];
    
        
        for(let i=0; i<list.length; i++ ){
            if(list[i].checked){
                let a = list[i].value;
                ckList.push(a);
            }
            
        }
        ckList.push(userId)
        
        
        const result = confirm('장바구니를 삭제?')
        
        if(result){
            axios
            .post('api/cartid', ckList)
            .then(response => {
                updateCartList(response.data)
                console.log(response.data);
            })
            .catch(err => {console.log(err)})
        }
        
        }) 
        
        
        
        
        

        

    
    

    
    
    
    
    
    
    
    
    
    
    
    
    
    
 })







