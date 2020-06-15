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

const host = process.env.LANDING_HOST;
const myhost = "https://xxx.com/api/";//自己的api

export default async function handler(bot: Wechaty, msg: Message) {
  const room = msg.room();
  const content = msg.text().trim(); // 消息内容
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

