<template>
   <div class="cinema_body">
	   <Loading v-if="isLoading" />
        <Scroller v-else>
				<ul>
					
					<!-- <li>
						<div>
							<span>大地影院(澳东世纪店)</span>
							<span class="q"><span class="price">22.9</span> 元起</span>
						</div>
						<div class="address">
							<span>金州区大连经济技术开发区澳东世纪3层</span>
							<span>1763.5km</span>
						</div>
						<div class="card">
                			<div>小吃</div>
                			<div>折扣卡</div>
       					</div>
					</li>
					<li>
						<div>
							<span>大地影院(澳东世纪店)</span>
							<span class="q"><span class="price">22.9</span> 元起</span>
						</div>
						<div class="address">
							<span>金州区大连经济技术开发区澳东世纪3层</span>
							<span>1763.5km</span>
						</div>
						<div class="card">
                			<div>小吃</div>
                			<div>折扣卡</div>
       					</div>
					</li>
					<li>
						<div>
							<span>大地影院(澳东世纪店)</span>
							<span class="q"><span class="price">22.9</span> 元起</span>
						</div>
						<div class="address">
							<span>金州区大连经济技术开发区澳东世纪3层</span>
							<span>1763.5km</span>
						</div>
						<div class="card">
                			<div>小吃</div>
                			<div>折扣卡</div>
       					</div>
					</li>
					<li>
						<div>
							<span>大地影院(澳东世纪店)</span>
							<span class="q"><span class="price">22.9</span> 元起</span>
						</div>
						<div class="address">
							<span>金州区大连经济技术开发区澳东世纪3层</span>
							<span>1763.5km</span>
						</div>
						<div class="card">
                			<div>小吃</div>
                			<div>折扣卡</div>
       					</div>
					</li>
					<li>
						<div>
							<span>大地影院(澳东世纪店)</span>
							<span class="q"><span class="price">22.9</span> 元起</span>
						</div>
						<div class="address">
							<span>金州区大连经济技术开发区澳东世纪3层</span>
							<span>1763.5km</span>
						</div>
						<div class="card">
                			<div>小吃</div>
                			<div>折扣卡</div>
       					</div>
					</li> -->
					<li v-for="item in cinemaList" :Key="item.id">
						<div>
							<span>{{item.nm}}</span>
							<span class="q"><span class="price">{{item.sellPrice}}</span> 元起</span>
						</div>
						<div class="address">
							<span>{{item.addr}}</span>
							<span>{{item.distance}}</span>
						</div>
						<div class="card">
                			<div v-for="(num,key) in item.tag"  v-if="num===1" :key="key" :class="key|classCard">{{ key | formateCard}}</div>
                			
       					</div>
					</li>
				</ul>
        </Scroller>
			</div> 
</template>
<script>
export default {
	name:'Clist',
	data(){
		return{
			cinemaList:[],
			 isLoading : true,
             prevCityId:-1
		}
		
	},
	mounted(){
		 var cityId = this.$store.state.city.id;
         if( this.prevCityId === cityId ){ return; }
		 this.isLoading = true;
		 console.log(123)
		this.axios.get('/ajax/cinemaList?day=2019-12-10&offset=0&limit=20&districtId=-1&lineId=-1&hallType=-1&brandId=-1&serviceId=-1&areaId=-1&stationId=-1&item=&updateShowDay=true&reqId=1575948234197&cityId='+cityId+'&optimus_uuid=E5B867D0127611EA82BB8DCFE65B145C60BDC5FFC8DD4539B2A9FCC298AD453B&optimus_risk_level=71&optimus_code=10').then((res)=>{
			 var msg = res.statusText;//数据里的请求状态切记大写
			 if(msg==="OK"){
				 this.cinemaList = res.data.cinemas;
				  this.isLoading = false;
                  this.prevCityId = cityId
				 }
	
			
		})
	},
	filters:{
		formateCard(key){
			var card = [
				{key:'allowRefund',value : '改签'},
				{key:'endorse',value:'退'},
				{key:'sell',value:'折扣卡'},
				{key:'snack',value:'小吃'},
			]
			for(var i=0;i<card.length;i++){
				if(card[i].key===key){
					return card[i].value
				}
			}
			return '';
		},
		classCard(key){
			var card = [
				{key:'allowRefund',value : 'bl'},
				{key:'endorse',value:'bl'},
				{key:'sell',value:'or'},
				{key:'snack',value:'or'},
			]
			for(var i=0;i<card.length;i++){
				if(card[i].key===key){
					return card[i].value
				}
			}
			return '';
		}
	}
}
</script>
<style scoped>
#content .cinema_body{ flex:1; overflow:auto;}
.cinema_body ul{ padding:20px;}
.cinema_body li{  border-bottom:1px solid #e6e6e6; margin-bottom: 20px;}
.cinema_body div{ margin-bottom: 10px;}
.cinema_body .q{ font-size: 11px; color:#f03d37;}
.cinema_body .price{ font-size: 18px;}
.cinema_body .address{ font-size: 13px; color:#666;}
.cinema_body .address span:nth-of-type(2){ float:right; }
.cinema_body .card{ display: flex;}
.cinema_body .card div{ padding: 0 3px; height: 15px; line-height: 15px; border-radius: 2px; color: #f90; border: 1px solid #f90; font-size: 13px; margin-right: 5px;}
.cinema_body .card div.or{ color: #f90; border: 1px solid #f90;}
.cinema_body .card div.bl{ color: #589daf; border: 1px solid #589daf;}
</style>