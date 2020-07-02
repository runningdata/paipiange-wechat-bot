import { Message, Wechaty, Contact, UrlLink, FileBox } from 'wechaty';
import { delay } from '../tools';
import axios from 'axios';

const helperTmp = () =>
  ` --帮助手册--
  回复【段子】查看段子
  回复【舔狗】查看舔狗
  回复【美图】查看美图
  回复【薅羊毛】最新薅羊毛
  回复【电影】查看最新电影
  回复【分享】查看最新分享
`;


const ddict = [
  "坤为地000000=0",
  "山地剥000001=1",
  "水地比000010=2",
  "风地观000011=3",
  "雷地豫000100=4",
  "火地晋000101=5",
  "泽地萃000110=6",
  "天地否000111=7",
  "地山谦001000=8",
  "艮为山001001=9",
  "水山蹇001010=10",
  "风山渐001011=11",
  "雷山小过001100=12",
  "火山旅001101=13",
  "泽山咸001110=14",
  "天山遯001111=15",
  "地水师010000=16",
  "山水蒙010001=17",
  "坎为水010010=18",
  "风水涣010011=19",
  "雷水解010100=20",
  "火水未济010101=21",
  "泽水困010110=22",
  "天水讼010111=23",
  "地风升011000=24",
  "山风蛊011001=25",
  "水风井011010=26",
  "巽为风011011=27",
  "雷风恒011100=28",
  "火风鼎011101=29",
  "泽风大过011110=30",
  "天风姤011111=31",
  "地雷复100000=32",
  "山雷颐100001=33",
  "水雷屯100010=34",
  "风雷益100011=35",
  "震为雷100101=36",
  "火雷噬嗑100101=37",
  "泽雷随100110=38",
  "天雷无妄100111=39",
  "地火明夷101000=40",
  "山火贲101001=41",
  "水火既济101010=42",
  "风火家人101011=43",
  "雷火豊101100=44",
  "离为火101101=45",
  "泽火革101110=46",
  "天火同人101111=47",
  "地泽临110000=48",
  "山泽损110001=49",
  "水泽节110010=50",
  "风泽中孚110011=51",
  "雷泽归妹110100=52",
  "火泽睽110101=53",
  "兑为泽110110=54",
  "天泽履110111=55",
  "地天泰111000=56",
  "山天大畜111001=57",
  "水天需111010=58",
  "风天小畜111011=59",
  "雷天大壮111100=60",
  "火天大有111101=61",
  "泽天夬111110=62",
  "乾为天111111=6"
]

const GUA_HELP = "=== 算卦说明 === \n\n 1. 抛硬币6次，正面记1，反面记0。 \n 2. 以【求卦-111000】的方式发送过来即可 \n 3. 心诚则灵 \n 4. 提倡用易来明事理，而不是求命运"


const host = process.env.LANDING_HOST;
const myhost = "https://xxx.com/api/";//自己的api

export default async function handler(bot: Wechaty, msg: Message) {
  const room = msg.room();
  const content = msg.text().trim(); // 消息内容
  if(content == "求卦") {
    await msg.say(GUA_HELP)
    return
  }
  if(content.indexOf("求卦-") > -1) {
      let code = content.split("求卦-")[1]
      try {
        ddict.forEach((item,index,array)=>{
          if (item.indexOf(code) > -1 ) {
            let o_name = item.split(code)[0]
            let names = o_name.split("为")
            if (names.length > 1) {
              o_name = names[0]
            }
            if (o_name.length > 2) {
              o_name = o_name.slice(2)
            }
            throw new Error(o_name + "卦")
          }
        }) 
      } catch (error) {
        log.info("找到了" + error.message)
        let resp = "https://baike.baidu.com/item/" + error.message
        const linkPayload = new UrlLink({ description : (" === 友情提示" + msg.from().name() + " === \n看易理，命运自己掌握，我们只需要看清时局！"), 
              thumbnailUrl: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3740483648,506813176&fm=26&gp=0.jpg', 
              title : error.message, 
              url : resp})
        
        log.info(resp)
        await msg.say(linkPayload)
        return
      }
  }

  console.log(content)
  if (room) {
    // 如果是微信群消息
 
	 const isText = msg.type() === bot.Message.Type.Text;
	 // const is_at_me = str.indexOf("@") != -1;
	 //判断是否at我	 我的名字是 只是好玩 可以修改自己的
	 if(content.indexOf("@只是好玩") != -1){
		 if (isText) {
		  
		   if (content.indexOf("段子") != -1 ) {
		     await delay(1000); //暂停一秒 不然反应太快 机器人
		           //msg.say('段子你个鬼');
		           const duanzi = await axios.get(myhost+'duanzi/rand')
		     .then(function (response) {
		       console.log(response.data);
		       return response.data;
		       
		     })
		     .catch(function (error) {
		       console.log(error);
		     });
		     msg.say(duanzi);
			 return;
			 
		   } else if (content.indexOf("舔狗") != -1) {
		    const duanzi = await axios.get(myhost+'tiangou/rand')
		    .then(function (response) {
		      console.log(response.data);
		      return response.data;
		      
		    })
		    .catch(function (error) {
		      console.log(error);
		    });
		    
		    await msg.say(duanzi);
		     return;
		   }else if (content.indexOf("美图") != -1) {
		    // const duanzi = await axios.get(myhost+'tiangou/rand')
		    // .then(function (response) {
		    //   console.log(response.data);
		    //   return response.data;
		      
		    // })
		    // .catch(function (error) {
		    //   console.log(error);
		    // });
		    
		    // await msg.say(duanzi);
			await msg.say('美图.jpg');
		     return;
		   }else if (content.indexOf("pua") != -1) {
		    const duanzi = await axios.get(myhost+'pua/rand')
		    .then(function (response) {
		      console.log(response.data);
		      return response.data;
		      
		    })
		    .catch(function (error) {
		      console.log(error);
		    });
		    
		    await msg.say(duanzi);
		     return;
		   }else if (content.indexOf("毒鸡汤") != -1) {
		    const duanzi = await axios.get(myhost+'soul/rand')
		    .then(function (response) {
		      console.log(response.data);
		      return response.data;
		      
		    })
		    .catch(function (error) {
		      console.log(error);
		    });
		    
		    await msg.say(duanzi);
		     return;
		   }  else {
			    msg.say('at 我干嘛');
				return;
		     // await onUtilsMessage(msg);
		   }
		 }
	 }
	 return;
	  
  }

  const contact = msg.from();
  const text = msg.text();
  const type = contact.type();
  // console.log(contact);
  console.log(text);
  console.log(type);

  if (type === Contact.Type.Official) {
    // 如果是公众号消息
    return;
  }

  if (contact.type() === bot.Contact.Type.Personal)
    switch (text) {
      case '帮助': {
        await delay(1000);
        msg.say(helperTmp());
        return;
      }
      case '段子': {
        await delay(1000);
        //msg.say('段子你个鬼');
        const duanzi = await axios.get(myhost+'duanzi/rand')
		.then(function (response) {
		console.log(response.data);
		return response.data;
    
		  })
		  .catch(function (error) {
			console.log(error);
		  });
		  msg.say(duanzi);
				return;
      }
	  case '毒鸡汤': {
	    await delay(1000);
	    //msg.say('段子你个鬼');
	    const duanzi = await axios.get(myhost+'soul/rand')
	  		.then(function (response) {
	  		console.log(response.data);
	  		return response.data;
	      
	  		  })
	  		  .catch(function (error) {
	  			console.log(error);
	  		  });
	  		  msg.say(duanzi);
	  				return;
	  }
	  case 'pua': {
	    await delay(1000);
	    //msg.say('段子你个鬼');
	    const duanzi = await axios.get(myhost+'pua/rand')
	  		.then(function (response) {
	  		console.log(response.data);
	  		return response.data;
	      
	  		  })
	  		  .catch(function (error) {
	  			console.log(error);
	  		  });
	  		  msg.say(duanzi);
	  				return;
	  }
      case '美图': {
         await delay(1000);
        const pic = await axios.get(myhost+'pic/rand')
        .then(function (response) {
          console.log(response.data);
          return response.data;
          
        })
        .catch(function (error) {
          console.log(error);
        });
		
		// 3. send Image to bot itself from remote url
		
		// const fileBox = FileBox.fromUrl('https://xx.com/logo.png')
		const fileBox = FileBox.fromUrl(pic)
		await msg.say(fileBox)
		return;
		
		
      }
      case '薅羊毛': {
		  await delay(1000);
		  const duanzi = await axios.get(myhost+'hym/rand')
		  .then(function (response) {
		    console.log(response.data);
		    return response.data;
		    
		  })
		  .catch(function (error) {
		    console.log(error);
		  });
		  
		  // 3. send Image to bot itself from remote url
		  
		  // const fileBox = FileBox.fromUrl(duanzi)
		  await msg.say(duanzi);
		   return;
       
      }
      case '电影': {
		  await delay(1000);
       const duanzi = await axios.get(myhost+'movie/rand')
       .then(function (response) {
         console.log(response.data);
         return response.data;
         
       })
       .catch(function (error) {
         console.log(error);
       });

       await msg.say(duanzi);
        return;
      }
      case '分享': {
        await delay(1000);
        const duanzi = await axios.get(myhost+'topics/rand')
        .then(function (response) {
          console.log(response.data);
          return response.data;
          
        })
        .catch(function (error) {
          console.log(error);
        });
        
        await msg.say(duanzi);
         return;
		 
      }
	  case '舔狗': {
	    await delay(1000);
	    const duanzi = await axios.get(myhost+'tiangou/rand')
	    .then(function (response) {
	      console.log(response.data);
	      return response.data;
	      
	    })
	    .catch(function (error) {
	      console.log(error);
	    });
	    
	    await msg.say(duanzi);
	     return;
	  		 
	  }
      
      default:
        break;
    }
}

