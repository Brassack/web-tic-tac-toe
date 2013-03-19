//получаем контекст канваса
var main=document.getElementById('main').getContext('2d');




var img=new Image();
img.src='xo.png';
var turnAi=0;
//img.onload=setTimeout(function(){paint(1,0,0)},300);
//рисуем сетку
main.beginPath();
main.moveTo(0,100);
main.lineTo(300,100);
main.moveTo(0,200);
main.lineTo(300,200);
main.moveTo(100,0);
main.lineTo(100,300);
main.moveTo(200,0);
main.lineTo(200,300);
main.closePath();
main.stroke();

var field=new Array(9);
for(var i=0;i<9;i++)
	field[i]=0;

function paint(type,index,frame)
{
	//type--;
	//alert();
	//document.getElementById('main').width=document.getElementById('main').width;
	main.clearRect((index%3)*100+3,(index/3-index%3/3)*100+3,96,96);
	main.drawImage(
		img,//картинка
		frame*100,//х координата слайса
		(type-1)*150,//у координата слайса
		100,//размер слайса
		150,
		(index%3)*100+2,
		(index/3-index%3/3)*100+2,
		97,
		97
		)
	frame++;
	if(frame<4)
		setTimeout(function(){paint(type,index,frame)},20);
	else 
		if(turnAi)aiTurn();
		else gameResult();

}



function result(i,buffer)
{
	return (
			(buffer[0]==i&&buffer[1]==i&&buffer[2]==i)||
			(buffer[3]==i&&buffer[4]==i&&buffer[5]==i)||
			(buffer[6]==i&&buffer[7]==i&&buffer[8]==i)||
			(buffer[0]==i&&buffer[4]==i&&buffer[8]==i)||
			(buffer[0]==i&&buffer[3]==i&&buffer[6]==i)||
			(buffer[1]==i&&buffer[4]==i&&buffer[7]==i)||
			(buffer[2]==i&&buffer[5]==i&&buffer[8]==i)||
			(buffer[2]==i&&buffer[4]==i&&buffer[6]==i)
			)
}


function stepX(count,buffer)
{
if (count<3)
	{
		for(var i=0;i<9;i++)
			if(buffer[i]==0)
			{
				buffer[i]=2;
				if (result(2,buffer))return true;
				if(stepO(count,buffer.concat()))return true;
				buffer[i]=0;
			}

		for(var i=0;i<9;i++)
			if(buffer[i]==0)
				return false;

	}
return true;
}


function stepO(count,buffer)
{
	for(var i=0;i<9;i++)
		if (buffer[i]==0)
			{

				buffer[i]=1;				
				if (result(1,buffer))
						return false;
				buffer[i]=0;
			}

	for(var i=0;i<9;i++)
		if (buffer[i]==0)
			{

				buffer[i]=1;

				if(!stepX(count+1,buffer.concat()))
				return false;
				buffer[i]=0;
			}

return true;
}



function ai()
{

	for(var i=0;i<=9;i++)
		if (field[i]==0)
		{
			field[i]=2;
			if(result(2,field))
				{field[i]=0;return i;}
			field[i]=0;
		}

	for(var i=0;i<=9;i++)
		if (field[i]==0)
		{
			field[i]=2;
			if(stepO(0,field.concat()))
				{field[i]=0;return i};
			field[i]=0;
		}


}

function aiTurn()
{

	if(!gameResult())return;
	index=ai();
	field[index]=2;
	turnAi=0;
	paint(2,index,0);

	//gameResult();
}

function click(event)
{
	if(turnAi==0)
	{
		var index=Math.round((event.pageX/100-event.pageX%100/100)+(event.pageY/100-event.pageY%100/100)*3);
		//console.log(index);
		if (field[index]==0) 
			{
				field[index]=1;
				turnAi=1;
				paint(1,index,0);
			}
	}
	
}

function gameResult()
{

	if(result(1,field)){alert('You win');click=function (){return false};return false}
	if(result(2,field)){alert('You loose');click=function (){return false};return false}
	for(var i=0;i<9;i++)
		if(field[i]==0) return true;
	alert('Draw');
	click=function (){return false};
	return false;
}