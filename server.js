var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;

var config = {
  user: 'siddharthhariprasad',
  database: 'siddharthhariprasad',
  host: 'db.imad.hasura-app.io',
  port: '5432',
  password: process.env.DB_PASSWORD
};


var app = express();
app.use(morgan('combined'));


var articles = {
    'article-one':  {
        title: 'Harry Potter | Siddharth Hariprasad',
        heading: '<marquee behavior="alternate"><H1>HARRY<br>POTTER</H1></marquee>',
        content: ` 
            <p>
                Harry Potter is a series of seven fantasy novels written by British author 
				J. K. Rowling. The series chronicles the adventures of a young wizard, Harry 
				Potter, the titular character, and his friends Ronald Weasley and Hermione 
				Granger, all of whom are students at Hogwarts School of Witchcraft and Wizardry. 
				The main story arc concerns Harry's quest to overcome the Dark wizard Lord Voldemort, 
				who aims to become immortal, conquer the wizarding world, subjugate non-magical people, 
				and destroy all those who stand in his way, especially Harry Potter.
            </p>
            <p>
                <i>
					<img src = "https://1.bp.blogspot.com/-k4QRmkZkBgs/V91VPtw2MPI/AAAAAAAACYo/g3vX00M14f4prItTMhIG-l1fivWQZzMRQCLcB/s1600/hp2.jpg" alt = "Harry Potter" width = "300" height = "250">
					Harry Potter &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
					<img src = "https://4.bp.blogspot.com/-jEhpqRFFbDY/V91VWNKVjvI/AAAAAAAACaw/TJMwiA2H8xEjKnpqv0KfuuzlmkNAJqj2QCLcB/s1600/rw2.jpg" alt = "Ronald Weasley" width = "300" height = "250">
					Ronald Weasley
				</i>
			</p>
			<p>
				<i>
					<img src = "https://1.bp.blogspot.com/-4_kLiKaJllQ/V91VOG6PNkI/AAAAAAAACYM/IA8xB5Nibv0lQDHCx6WSaxc-sEtIegzeQCLcB/s1600/hg2.jpg" alt = "Hermione Granger" width = "300" height = "250">
					Hermione Granger &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
					<img src = "https://4.bp.blogspot.com/-qodwM1YM9e0/V91VYWgMR0I/AAAAAAAACbg/QsuJYIohF5gXSirGiEThBVeROVCK_s5CwCLcB/s1600/vo.jpg" alt = "Voldemort" width = "300" height = "250">
					Lord Voldemort
				</i>
            </p>
            <p>
				<u><h3>Following are the 8 novels.<br></h3></u>
				<img src = "https://1.bp.blogspot.com/-MDy2uWQ3hxI/V91VPHiH8pI/AAAAAAAACYg/7HdPQcX-g5kdPS0SGZjhHkTC5JHAkfXTgCLcB/s1600/hp1book.jpg" alt = "book 1" width = "175" height = "250">
				&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
				<img src  = "https://4.bp.blogspot.com/-7jzonnLf0UY/V91VPyCTmiI/AAAAAAAACYs/yyZMMWUaDVMiF78WsT5Z6z_ixWgBB9UhACLcB/s1600/hp2book.jpg" alt = "book 2" width = "175" height = "250">
				&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
				<img src = "https://4.bp.blogspot.com/-yeyjJbdxA4Q/V91VQbObHNI/AAAAAAAACY4/McOOEQJyXBMxbTnEGS5snpyYmenjU0ZfgCLcB/s1600/hp3book.jpg" alt = "book 3" width = "175" height = "250">
				&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
				<img src = "https://3.bp.blogspot.com/-l4How47DWr0/V91VQmoN2JI/AAAAAAAACZA/zmkqGp__UbouwguutlvSr7HbXU8ZVtRfgCLcB/s1600/hp4book.jpg" alt = "book 4" width = "175" height = "250">
			</p>
			<p>	
				<img src = "https://1.bp.blogspot.com/-D5cRSxc5PpQ/V91VRFD3wVI/AAAAAAAACZI/sN2miwdMpIk2L5E6FCCBINUW7fzgUGttwCLcB/s1600/hp5book.jpg" alt = "book 5" width = "175" height = "250">
				&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
				<img src = "https://3.bp.blogspot.com/-pXMfVWrPIfw/V91VRnd4nHI/AAAAAAAACZQ/5a9f6qfgcGMRjyfc1Th475mIqjLIfaPEQCLcB/s1600/hp6book.jpg" alt = "book 6" width = "175" height = "250">
				&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
				<img src = "https://1.bp.blogspot.com/-_SSNogW7hMA/V91VRgs6dUI/AAAAAAAACZY/FVC4qrGWopYTs7TwB-592japLdR3klwfQCLcB/s1600/hp7book.jpg" alt = "book 7" width = "175" height = "250">
				&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
				<img src = "https://2.bp.blogspot.com/-MHbKI3Wosjg/V91ZAg-NxpI/AAAAAAAACb8/HNtH4QA-wJYH0-A64CaPUwcQhYcXhH82QCLcB/s1600/Harry_Potter_and_the_Cursed_Child_Special_Rehearsal_Edition_Book_Cover.jpg" alt = "book 8" width = "175" height = "250">
			</p>
			<p>
				Since the release of the first novel, Harry Potter and the Philosopher's Stone, 
				on 30 June 1997, the books have gained immense popularity, critical acclaim and commercial 
				success worldwide.The series has also had some share of criticism, including concern about 
				the increasingly dark tone as the series progressed. As of May 2015, the books have sold more 
				than 450 million copies worldwide, making the series the best-selling book series in history, 
				and have been translated into 73 languages. The last four books consecutively set records as 
				the fastest-selling books in history, with the final instalment selling roughly 11 million copies 
				in the United States within the first 24 hours of its release.            
			</p>
            <p>
				A series of many genres, including fantasy, coming of age and the British school 
				story (with elements of mystery, thriller, adventure and romance), it has many 
				cultural meanings and references. According to Rowling, the main theme is death. 
				There are also many other themes in the series, such as prejudice and corruption.
            </p>
			<p>
				The series was originally printed in English by two major publishers, Bloomsbury 
				in the United Kingdom and Scholastic Press in the United States. The books have 
				since been published by many publishers worldwide.<b><u><strong> The books, with the 
				seventh book split into two parts, have been made into an eight-part film series by 
				Warner Bros.</b></u></strong> Pictures, the highest-grossing film series as of October 
				2014. The series also originated much tie-in merchandise, making the Harry Potter brand 
				worth in excess of $15 billion. The 8th book is a script book which has been written for the play
				<strong>Harry Potter and the Cursed Child</strong>
			</p>
			<p>
				Because of the success of the books and films, Harry Potter-themed areas, known 
				as The Wizarding World of Harry Potter, have been created at several Universal 
				Parks & Resorts theme parks.
            </p>
			<p>
				<u><h3>Following are the 8 movies.<br></h3></u>
				<img src = "https://4.bp.blogspot.com/-vWmfgu0vvGY/V91VPcHT-BI/AAAAAAAACYk/VFHc63Rcjb0GoNJzZYVVS2gR-JhJfEjEgCLcB/s1600/hp1film.jpg" alt = "film 1" width = "175" height = "250">
				&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
				<img src = "https://1.bp.blogspot.com/-0QC05mgxdTk/V91VP3vcMDI/AAAAAAAACY0/HVPtB4TWMgczhTlJxwOi8mD0seWfNqxkACLcB/s1600/hp2film.jpg" alt = "film 2" width = "175" height = "250">
				&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
				<img src = "https://2.bp.blogspot.com/-SODWpFkNsbQ/V91VQsl56dI/AAAAAAAACY8/F9facuAGliok7sl6vH2UBvv2TT0-Hd7YgCLcB/s1600/hp3film.jpg" alt = "film 3" width = "175" height = "250">
				&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
				<img src = "https://4.bp.blogspot.com/-JuhonEz8Cm8/V91VQ090ZuI/AAAAAAAACZE/QXC_QOzQmds2p89mRr4pwS9P0gEM_761ACLcB/s1600/hp4film.jpg" alt = "film 4" width = "175" height = "250">
			</p>
			<p>
				<img src = "https://3.bp.blogspot.com/-s2Be65Tpo2k/V91VRCi6DzI/AAAAAAAACZM/gG_aUaWwEd0lr9nyxxykcs4V9Rqh-J53ACLcB/s1600/hp5film.jpg" alt = "film 5" width = "175" height = "250">
				&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
				<img src = "https://4.bp.blogspot.com/-jhK4wyP6ajw/V91VRgkF7bI/AAAAAAAACZU/t8w1FIcVnNw5J7-IJINNKg83DOWxs2IPACLcB/s1600/hp6film.jpg" alt = "film 6" width = "175" height = "250">
				&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
				<img src = "https://4.bp.blogspot.com/-1x2JL4ZKYR4/V91VSG-dTTI/AAAAAAAACZc/khHDuiUYQBQNO6byQ3-U4L4OkIaAaR0yQCLcB/s1600/hp7film.jpg" alt = "film 7" width = "175" height = "250">
				&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
				<img src = "https://1.bp.blogspot.com/--qtKuvVaI8k/V91VSeJWDyI/AAAAAAAACZk/s-tQId_MAssi4PdbESn6SpyNGyx5mHMzgCLcB/s1600/hp8film.jpg" alt = "film 8" width = "175" height = "250">
			</p>
				<u><h3>This is the Drama based on the 8th book.</h3></u><br>
			<p align = "center" >
				<img src = "https://1.bp.blogspot.com/-d9pGOrZ51Ho/V91Zj-IsmgI/AAAAAAAACcA/RzSjfj8TRPo41gFiVmyrxsKOgVvWBjBdQCLcB/s1600/Harry_Potter_Cursed_Child_Play.jpg" alt = "film 8" width = "350" height = "250">
			</p>`,
		controls:`
			<p align = "right">
				<a href="article-two">PLOT<marquee scrollamount="5" direction="right" width="40">&gt;&gt;&gt;</marquee></marquee></a>
			</p>`
    },
    'article-two': {
        title: 'Plot | Siddharth Hariprasad',
        heading: '<marquee behavior="alternate"><h2>PLOT</h2></marquee>',
        content: ` 
             <p>
				The novels revolve around Harry Potter, an orphan who discovers at the age of 11 that he 
				is a wizard, living within the ordinary world of non-magical people, known as Muggles. 
				The wizarding world is secret from the Muggle world, presumably to avoid persecution of 
				witches and wizards. His ability is inborn, and such children are invited to attend an 
				exclusive magic school that teaches the necessary skills to succeed in the wizarding world. 
				Harry becomes a student at Hogwarts School of Witchcraft and Wizardry, and it is here where 
				most of the events in the series take place. As Harry develops through his adolescence, he 
				learns to overcome the problems that face him: magical, social and emotional, including ordinary 
				teenage challenges such as friendships, infatuation and exams, and the greater test of preparing 
				himself for the confrontation in the real world that lies ahead. 
			</p>
            <p>
				<i>
					<img src = "https://2.bp.blogspot.com/-nZD5Z-mB-cM/V91VSItBgvI/AAAAAAAACZg/-aUhNuUC3Ng72YFLVEY8m_31x4gd_pR8ACLcB/s1600/hpinmuggleclothes.jpg" alt = "harry potter in muggle clothes" width = "300" height = "200">
					Harry Potter &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
					<img src = "https://4.bp.blogspot.com/-l2xqzjSjuGQ/V91VO-7K0_I/AAAAAAAACYY/I0aDxDOX1c4Ap5f_YQUAqHgIkT8NcZeUQCLcB/s1600/hogwarts.jpg" alt = "hogwarts castle" width = "300" height = "200">
					Hogwarts Castle
				</i>
			</p>
			<p align = "center">
				<i>
					<img src = "https://2.bp.blogspot.com/-r_lrU4SLWiA/V91VKXsUIQI/AAAAAAAACW4/iRcDPLDH1Boj9a3p57AdiJjBotiw0iZlwCLcB/s1600/crest.jpg" alt = "hogwarts crest" width = "300" height = "300"><br>
					Hogwarts Crest
				</i>
            </p>
			<p>
				Each book chronicles one year in Harry's life with the main narrative being set in the years 1991 to 98. 
				The books also contain many flashbacks, which are frequently experienced by Harry viewing the memories 
				of other characters in a device called a Pensieve.<br>
				The environment Rowling created is completely separate from reality yet also intimately connected to it. 
				While the fantasy land of Narnia is an alternative universe and the Lord of the Rings' Middle-earth a 
				mythic past, the wizarding world of Harry Potter exists in parallel within the real world and contains 
				magical versions of the ordinary elements of everyday life. Many of its institutions and locations are 
				recognisable, such as London. It comprises a fragmented collection of overlooked hidden streets, ancient 
				pubs, lonely country manors and secluded castles that remain invisible to the Muggle population.
			</p>
			<p>
				In 1990, Rowling was on a crowded train from Manchester to London when the idea for Harry suddenly 
				"fell into her head". Rowling gives an account of the experience on her website saying"I had been 
				writing almost continuously since the age of six but I had never been so excited about an idea before. 
				I simply sat and thought, for four (delayed train) hours, and all the details bubbled up in my brain, 
				and this scrawny, black-haired, bespectacled boy who did not know he was a wizard became more and more 
				real to me."
            </p>
			<p align = "center">
				<i>
					<img src = "https://1.bp.blogspot.com/-IvjWlvOYuHw/V91VI2_YRKI/AAAAAAAACWY/85imXbiv0SYvGOH6vxyE6dQ3i96nf-_PwCLcB/s1600/JKR.jpg" alt = "J.K.Rowling" width = "400" height = "300"><br>
					J.K.Rowling
				</i>
			</p>`,
		controls:`
			<p align = "center">
				<a href="article-one"><marquee scrollamount="5" width="40">&lt;&lt;&lt;</marquee></marquee>HARRY POTTER</a>
				&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp 
				<a href="article-three">CULTURAL IMPACT<marquee scrollamount="5" direction="right" width="40">&gt;&gt;&gt;</marquee></marquee></a>
			</p>`
    },
    'article-three': {
        title: 'Cultural Impact | Siddharth Hariprasad',
        heading: '<marquee behavior="alternate"><h2>CULTURAL IMPACT</h2></marquee>',
        content: ` 
            <div class = "para">
				<p>
					Fans of the series were so eager for the latest instalment that bookstores around the world began 
					holding events to coincide with the midnight release of the books, beginning with the 2000 publication 
					of Harry Potter and the Goblet of Fire. The events, commonly featuring mock sorting, games, face painting, 
					and other live entertainment have achieved popularity with Potter fans and have been highly successful in 
					attracting fans and selling books with nearly nine million of the 10.8 million initial print copies of 
					Harry Potter and the Half-Blood Prince sold in the first 24 hours. The final book in the series, Harry 
					Potter and the Deathly Hallows became the fastest selling book in history, moving 11 million units in 
					the first twenty-four hours of release. The series has also gathered adult fans, leading to the release 
					of two editions of each Harry Potter book, identical in text but with one edition's cover artwork aimed 
					at children and the other aimed at adults. Besides meeting online through blogs, podcasts, and fansites, 
					Harry Potter super-fans can also meet at Harry Potter symposia.<br>
					The word Muggle has spread beyond its Harry Potter origins, becoming one of few pop culture words to land 
					in the Oxford English Dictionary.The Harry Potter fandom has embraced podcasts as a regular, often weekly, 
					insight to the latest discussion in the fandom. Both MuggleCast and PotterCast have reached the top spot of 
					iTunes podcast rankings and have been polled one of the top 50 favourite podcasts.
				</p>
				<p>
					<img src = "https://1.bp.blogspot.com/-EC-bU__vTTQ/V9-f-hdFjkI/AAAAAAAACc0/949hIp0CHvkyFPmNYg5xsppPnRVSWWDCgCLcB/s1600/fans.jpg" alt = "harry potter fans" width = "300" height = "200">
					&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp 
					<img src = "https://1.bp.blogspot.com/-aCY9ICl-vko/V9-f3TflqcI/AAAAAAAACcw/n8nMRboqSeQmxSMhrsuXT3Cc1E7jV7sfgCLcB/s1600/booked.jpg" alt = "harry potter fan with book" width = "300" height = "200">
				</p>
			</div>`,
		controls:`
			<p align = "center">
				<a href="article-two"><marquee scrollamount="5" width="40">&lt;&lt;&lt;</marquee></marquee>PLOT</a>
				&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp 
				<a href="article-four">THE WIZARDING WORLD OF HARRY POTTER<marquee scrollamount="5" direction="right" width="40">&gt;&gt;&gt;</marquee></marquee></a>
			</p>`
    },
	'article-four':{
		title: 'The Wizarding World of Harry Potter | Siddharth Hariprasad',
        heading: '<h2><marquee behavior="alternate">The<br>Wizarding<br>World<br>of<br>Harry<br>Potter</marquee></h2>',
        content: ` 
            <p>
				After the success of the films and books, Universal and Warner Brothers announced they would create The 
				Wizarding World of Harry Potter, a new Harry Potter-themed expansion to the Islands of Adventure theme 
				park at Universal Orlando Resort in Florida. The land officially opened to the public on 18 June 2010. 
				It includes re-creation of Hogsmeade and several rides. The flagship attraction is Harry Potter and the 
				Forbidden Journey, which exists within a re-creation of Hogwarts School of Witchcraft and Wizardry. Other 
				rides include Dragon Challenge, a pair of inverted roller coasters, and Flight of the Hippogriff, a family 
				roller coaster.<br>
				Four years later, on 8 July 2014, Universal opened a Harry Potter-themed area at the Universal Studios 
				Florida theme park. It includes re-creation of Diagon Alley and connecting alleys, as well as, a small 
				section of Muggle London. The flagship attraction is Harry Potter and the Escape from Gringotts roller 
				coaster ride. Universal also added a completely functioning recreation of the Hogwarts Express connecting 
				Kings Cross Station at Universal Studios Florida to the Hogsmeade station at Islands of Adventure. Both 
				Hogsmeade and Diagon Alley contain many shops and restaurants from the book series.<br>
            </p>
			<p>
				<i>
					<img src = "https://1.bp.blogspot.com/-ynMChUw4f5A/V91VKgpP8HI/AAAAAAAACXA/vpSrCjiYkgkBs65qqh0TvMP1OmpChF93QCLcB/s1600/diagonalley.jpg" alt = "Diagon Alley" width = "350" height = "300">
					Diagon Alley &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
					<img src = "https://1.bp.blogspot.com/-szfIYOTr3qo/V91VOeXQBOI/AAAAAAAACYQ/nB-m05lLUlcbwiPzjf7PEi5CEE8KO1HdQCLcB/s1600/hogsmeade.jpg" alt = "Hogsmeade" width = "350" height = "300">
					Hogsmeade
				</i>
			</p>
			<p>
				On 15 July 2014, The Wizarding World of Harry Potter opened at the Universal Studios Japan theme park in 
				Osaka, Japan. It includes the village of Hogsmeade, Harry Potter and the Forbidden Journey ride, and Flight 
				of the Hippogriff roller coaster.<br>
				There is also The Wizarding World of Harry Potter under construction at the Universal Studios Hollywood 
				theme park near Los Angeles, California, with a planned opening in 2016.
			</p>
			<p>
				<img src = "https://1.bp.blogspot.com/-uPkCWJzmkvQ/V91VX9YWDHI/AAAAAAAACbY/8QNT3BZBrYEUqFO3xRiHzjMh4FT5CEo4gCLcB/s1600/us.jpg" alt = "universal studios" width = "350" height = "300">
				&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
				<img src = "https://2.bp.blogspot.com/-fMqCssYuG1I/V91VPN6SR6I/AAAAAAAACYc/Y9SSIyeAYmwp3okNpBnwk_nfeccx_Cu-ACLcB/s1600/hp1.jpg" alt = "Harry Potter" width = "350" height = "300">
			</p>
			<p align = "center">
				<img src = "https://4.bp.blogspot.com/-nZ7rQf0XSHQ/V91VP2B6AZI/AAAAAAAACYw/cP209VhzFGsQtHW777ZMc-K0-LgGeKlnwCLcB/s1600/hp3.jpg" alt = "Harry Potter" width = "350" height = "300"><br>
			</p>`,
		controls:`
			<p align = "center">
				<a href="article-three"><marquee scrollamount="5" width="40">&lt;&lt;&lt;</marquee></marquee>CULTURAL IMPACT</a>
				&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp 
				<a href="article-five">CHARACTERS<marquee scrollamount="5" direction="right" width="40">&gt;&gt;&gt;</marquee></marquee></a>
			</p>`
	},
	'article-five': {
		title: 'Characters | Siddharth Hariprasad',
        heading: '<marquee behavior="alternate"><h2>Characters</h2></marquee>',
        content: ` 
            <h3>
				<p align = "center">
					<a href="article-six">Albus Dumbledore</a><br><br>
					<a href="article-seven">Draco Malfoy</a><br><br>
					<a href="article-eight">Hermione Granger</a><br><br>
					<a href="article-nine">Ronald Weasley</a><br><br>
					<a href="article-ten">Lord Voldemort</a><br><br>
					<a href="article-eleven">Other Characters</a><br><br>
				</p>
			</h3>`,
		controls:`
			<p align = "center">
				<a href="article-four"><marquee scrollamount="5" width="40">&lt;&lt;&lt;</marquee>THE WIZARDING WORLD OF HARRY POTTER</a>
				&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp 
				<a href="article-twelve">WANDS<marquee scrollamount="5" direction="right" width="40">&gt;&gt;&gt;</marquee></marquee></a>
			</p>`

	},
	'article-six': {
		title: 'Albus Dumbledore | Siddharth Hariprasad',
        heading: '<h2><p align = "center">Albus Dumbledore</p></h2>',
        content: ` 
			<p align = "center">
				<img src = "https://1.bp.blogspot.com/-3YHDPfkqoXg/V91VLtW1sJI/AAAAAAAACXY/N9q9HHtw3lshNN1RK8KKJfFSz4w9DSuowCLcB/s1600/dumbledore.jpg" alt = "Albus Dumbledore" width = "300" height = "400">
			</p>
			<p align = "center">
				Professor Albus Percival Wulfric Brian Dumbledore is a fictional character in J. K. Rowling's 
				Harry Potter series. For most of the series, he is the headmaster of the wizarding school Hogwarts. 
				As part of his backstory, it is revealed that he is the founder and leader of the Order of the Phoenix, 
				an organisation dedicated to fighting Lord Voldemort.<br>
				Dumbledore is portrayed by Richard Harris in the film adaptations of Harry Potter and the Philosopher's 
				Stone and Harry Potter and the Chamber of Secrets. After Harris' death, Michael Gambon portrayed Dumbledore 
				for all of the remaining films.<br>
				Rowling stated she chose the name Dumbledore, which is an Early Modern English word for "bumblebee", because 
				of Dumbledore's love of music: she imagined him walking around "humming to himself a lot".
			</p>
			<p align = "center">
				<img src = "https://4.bp.blogspot.com/-ZNNXWUAOkmg/V91dSE-IpuI/AAAAAAAACcQ/hXYEaKTaGG8ulT7su1fLhVZt9fO53C8tQCLcB/s1600/1253806314531_f.jpg" width = "300" height = "400">
				&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
				<img src = "https://4.bp.blogspot.com/-RD7SqVpB37M/V91dSBW_VkI/AAAAAAAACcU/3hBdtN7b4FYojnF0OJ6ZFCMc900APvHEACLcB/s1600/tumblr_m61oxa4W3p1rrlv1l.jpg" width = "300" height = "400">
			</p>`,
		controls:`
			<p align = "left">
				<a href="article-five"><marquee scrollamount="5" width="40">&lt;&lt;&lt;</marquee>CHARACTERS</a>
			</p>`
	},
	'article-seven': {
		title: 'Draco Malfoy | Siddharth Hariprasad',
        heading: '<h2><p align = "center">Draco Malfoy</p></h2>',
        content: ` 
			<p align = "center">
				<img src = "https://4.bp.blogspot.com/-Plc2BwV9ySQ/V91VK8X_5xI/AAAAAAAACXE/nfd1lsE5n1IYz2awBOLGvUf8VQvx42obQCLcB/s1600/dm1.jpg" alt = "Draco Malfoy" width = "300" height = "400"><br>
			</p>
			<p align = "center">
				Draco Lucius Malfoy is a character in J. K. Rowling's Harry Potter series. He 
				is a student in Harry Potter's year belonging in the Slytherin house. He is 
				frequently accompanied by his two cronies, Vincent Crabbe and Gregory Goyle, 
				who act as henchmen. Draco is characterised as a cowardly bully who manipulates 
				and hurts people to get what he wants; nevertheless, he is a cunning user of magic. 
				He was played by Tom Felton in the Harry Potter film series.
			</p>
			<p align = "center">
				<img src = "https://4.bp.blogspot.com/-Ia7u7RE00Jg/V91VLG-YTpI/AAAAAAAACXI/MS2JacpUZVEZ6y-ixboctK5-r6hEDpKLgCLcB/s1600/dm2.jpg" alt = "Draco Malfoy" width = "300" height = "400">
				&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
				<img src = "https://2.bp.blogspot.com/-h3pHQ29bddE/V91VLM8m3CI/AAAAAAAACXM/LPWWWQQ6B38tXdVIG6XmQZ6FgCNLhH_hwCLcB/s1600/dm3.jpg" alt = "Draco Malfoy" width = "300" height = "400">
			</p>`,
		controls:`
			<p align = "left">
				<a href="article-five"><marquee scrollamount="5" width="40">&lt;&lt;&lt;</marquee>CHARACTERS</a>
			</p>`
	},
	'article-eight': {
		title: 'Hermione Granger | Siddharth Hariprasad',
        heading: '<h2><p align = "center">Hermione Granger</p></h2>',
        content: ` 
			<p align = "center">
				<img src = "https://1.bp.blogspot.com/-QsCSfZYer80/V91VN5SoUvI/AAAAAAAACYI/0BAY8WSs8IcU8Z02APcMgvD6HHGz_ovjwCLcB/s1600/hg1.jpg" alt = "Hermione Granger" width = "300" height = "400"><br>
			</p>
			<p align = "center">
				Hermione Jean Granger is a fictional character in J.K. Rowling's Harry Potter 
				series. She initially appears in the first novel, Harry Potter and the Philosopher's 
				Stone, as a new student on her way to Hogwarts. After Harry and Ron save her from a 
				mountain troll in the girls' toilets, she becomes close friends with them and often 
				uses her quick wit, deft recall, and encyclopaedic knowledge to help them. Rowling 
				has stated that Hermione resembles her at a younger age, with her insecurity and 
				fear of failure.
			</p>
			<p align = "center">
				<img src = "https://1.bp.blogspot.com/-4_kLiKaJllQ/V91VOG6PNkI/AAAAAAAACYM/IA8xB5Nibv0lQDHCx6WSaxc-sEtIegzeQCLcB/s1600/hg2.jpg" alt = "Hermione Granger" width = "300" height = "400">
				&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
				<img src = "https://3.bp.blogspot.com/-gLFAlx4d-M0/V91VOTl9fxI/AAAAAAAACYU/QGOg307s_5kQKPFytBWdW19B-HNmiUFnACLcB/s1600/hg3.jpg" alt = "Hermione Granger" width = "300" height = "400">
			</p>`,
		controls:`
			<p align = "left">
				<a href="article-five"><marquee scrollamount="5" width="40">&lt;&lt;&lt;</marquee>CHARACTERS</a>
			</p>`
	},
	'article-nine': {
		title: 'Ronald Weasley | Siddharth Hariprasad',
        heading: '<h2><p align = "center">Ronald Weasley</p></h2>',
        content: ` 
			<p align = "center">
				<img src = "https://4.bp.blogspot.com/-8gn0aVRawNU/V91VVrAlU7I/AAAAAAAACas/y_NvGz6OtXQQ8QN4Ddd1CiDh8KZYln7sQCLcB/s1600/rw1.jpg" alt = "Ronald Weasley" width = "300" height = "400"><br>
			</p>
			<p align = "center">
				Ronald Bilius "Ron" Weasley is a fictional character in J. K. Rowling's Harry Potter series. 
				His first appearance was in the first book of the series, Harry Potter and the Philosopher's Stone 
				as the best friend of Harry Potter and Hermione Granger. He is a member of the Weasley family, a 
				pure blood family, who reside in "The Burrow" outside Ottery St. Catchpole. Along with Harry and 
				Hermione, he is a member of the Gryffindor house. Ron is present in most of the action throughout the series.
			</p>
			<p align = "center">
				<img src = "https://4.bp.blogspot.com/-jEhpqRFFbDY/V91VWNKVjvI/AAAAAAAACaw/TJMwiA2H8xEjKnpqv0KfuuzlmkNAJqj2QCLcB/s1600/rw2.jpg" alt = "Ronald Weasley" width = "300" height = "400">
				&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
				<img src = "https://1.bp.blogspot.com/-48npnDBUVLs/V91VWOtRMII/AAAAAAAACa0/vplhwAxchPs1N7Mc8srRn6-RymerBswSQCLcB/s1600/rw3.jpg" alt = "Ronald Weasley" width = "300" height = "400">
			</p>`,
		controls:`
			<p align = "left">
				<a href="article-five"><marquee scrollamount="5" width="40">&lt;&lt;&lt;</marquee>CHARACTERS</a>
			</p>`
	},
	'article-ten': {
		title: 'Lord Voldemort | Siddharth Hariprasad',
        heading: '<h2><p align = "center">Lord Voldemort</p></h2>',
        content: ` 
			<p align = "center">
				<img src = "https://4.bp.blogspot.com/-qodwM1YM9e0/V91VYWgMR0I/AAAAAAAACbg/QsuJYIohF5gXSirGiEThBVeROVCK_s5CwCLcB/s1600/vo.jpg" alt = "Lord Voldemort" width = "300" height = "400"><br>
			</p>
			<p align = "center">
				Lord Voldemort  (born Tom Marvolo Riddle) is a fictional character in J. K. Rowling's 
				Harry Potter series. Voldemort first appeared in Harry Potter and the Philosopher's Stone, 
				which was released in 1997. Voldemort appeared either in person or in flashbacks in each book 
				and film adaptation in the series, except the third, Harry Potter and the Prisoner of Azkaban, 
				where he is mentioned.<br>
				In the series, Voldemort is the archenemy of Harry Potter, who according to a prophecy has "the 
				power to vanquish the Dark Lord". Almost no witch or wizard dares to speak his name, instead 
				referring to him by epithetssuch as "You-Know-Who", "He-Who-Must-Not-Be-Named" or "the Dark Lord". 
				Voldemort's obsession with blood purity signifies his aim to rid the wizarding world of Muggle 
				(non-magical) heritage and to conquer both worlds, Muggle and wizarding, to achieve pure-blood 
				dominance. Through his mother's family, he is the last descendant of wizard Salazar Slytherin, 
				one of the four founders of Hogwarts School of Witchcraft and Wizardry. He is the leader of the 
				Death Eaters, a group of evil wizards and witches dedicated to ridding the Wizarding World of 
				Muggles and establishing Voldemort as its supreme ruler.
			</p>
			<p align = "center">
				<img src = "https://2.bp.blogspot.com/-7e8_7vsBvUg/V91VXXiqFUI/AAAAAAAACbQ/I7hqFYbhnwskjsq3gDSNQzSrHbAtDLfWgCLcB/s1600/tr1.jpg" alt = "Lord Voldemort" width = "300" height = "400">
			</p>`,
		controls:`
			<p align = "left">
				<a href="article-five"><marquee scrollamount="5" width="40">&lt;&lt;&lt;</marquee>CHARACTERS</a>
			</p>`
	},
	'article-eleven': {
		title: 'Other characters | Siddharth Hariprasad',
        heading: '<h2><p align = "center">Other characters</p></h2>',
        content: ` 
			<p align = "center">
				<img src = "https://2.bp.blogspot.com/-MNtMuV3ITto/V91VJdEVi9I/AAAAAAAACWo/HnRDTk84iP4RXO5F7sQHWak4tYIIdhVogCLcB/s1600/bellatrix.jpg" width = "300" height = "400">
				bellatrix&nbsp&nbsp&nbsp&nbsp
				<img src = "https://2.bp.blogspot.com/-gqOg1rYfkBE/V91VJztTb8I/AAAAAAAACWs/o_TV7S9hXbw03Dyqcs0sRdxOkpuxiiwegCLcB/s1600/bill.jpg" width = "300" height = "400">
				bill&nbsp&nbsp&nbsp&nbsp
				<img src = "https://3.bp.blogspot.com/-5JxvlgvVF_Y/V91VJ5e29RI/AAAAAAAACWw/3ymXag76yAkv5FrbqQGEzjTejF9O055mwCLcB/s1600/charlie.jpg" width = "300" height = "400">
				charlie&nbsp&nbsp&nbsp&nbsp
				<img src = "https://2.bp.blogspot.com/-cgQU4gRJY-4/V91VKHy39kI/AAAAAAAACW0/YlZrEuR_IqoziFgI19T1bLuc7JM8hhdSwCLcB/s1600/crabbe.jpg" width = "300" height = "400">
				crabbe&nbsp&nbsp&nbsp&nbsp
				<img src = "https://2.bp.blogspot.com/-42Fq3vcbxG4/V91VKTqlSwI/AAAAAAAACW8/O1bf071SUaIL5U5d2EFhhuKVuNnINkhPgCLcB/s1600/crookshanks.jpg" width = "300" height = "400">
				crookshanks&nbsp&nbsp&nbsp&nbsp
				<img src = "https://3.bp.blogspot.com/-VLE98B1kBOI/V91VLutrchI/AAAAAAAACXQ/ebKaNA-YfwM4E59oPfMouStLLmm5gl3wQCLcB/s1600/dobby.jpg" width = "300" height = "400">
				dobby&nbsp&nbsp&nbsp&nbsp
				<img src = "https://4.bp.blogspot.com/-YLSBMNIBgzA/V91VLvNy9NI/AAAAAAAACXU/XfavfcMy3EEQZifPnA3ttijnuZgGlEc_QCLcB/s1600/dudley.jpg" width = "300" height = "400">
				dudley&nbsp&nbsp&nbsp&nbsp
				<img src = "https://3.bp.blogspot.com/-IDi-pBCVsKU/V91VMBTZdzI/AAAAAAAACXc/aYZ86ZoT0J0c5Nv5vdQJRxxEAzZHj2tmwCLcB/s1600/filch.jpg" width = "300" height = "400">
				filch&nbsp&nbsp&nbsp&nbsp
				<img src = "https://2.bp.blogspot.com/--mvvsEhoqQg/V91VMNnNsPI/AAAAAAAACXg/thgVtwYFEVguyAkn6fTj4x4vHcy529dqgCLcB/s1600/filtwick.jpg" width = "300" height = "400">
				filtwick&nbsp&nbsp&nbsp&nbsp
				<img src = "https://4.bp.blogspot.com/-vjCXx_bPHmQ/V91VMGuu-sI/AAAAAAAACXk/QPD5qKE3JJQuf4D5jLDSXtENNeEIjkekQCLcB/s1600/fleur.jpg" width = "300" height = "400">
				fleur&nbsp&nbsp&nbsp&nbsp
				<img src = "https://2.bp.blogspot.com/-JM9ot-oLlDw/V91VMrrOdbI/AAAAAAAACXo/dS4eJPfU9h8sdV5j2Ro_HQ8hck2C6PNVgCLcB/s1600/fred.jpg" width = "300" height = "400">
				fred&nbsp&nbsp&nbsp&nbsp
				<img src = "https://4.bp.blogspot.com/-6UbcxQMwiUE/V91VMrlNeAI/AAAAAAAACXs/frbnxWdBtAgnISGbcHn8tLIWvm_D7hlwgCLcB/s1600/george.jpg" width = "300" height = "400">
				george&nbsp&nbsp&nbsp&nbsp
				<img src = "https://1.bp.blogspot.com/-yS1uCjD291s/V91VM0F9kOI/AAAAAAAACXw/yH9njI3Dpc8eAqLUwYi4yIO1rF0DItpJQCLcB/s1600/ginny.jpg" width = "300" height = "400">
				ginny&nbsp&nbsp&nbsp&nbsp
				<img src = "https://2.bp.blogspot.com/-DGso-j1OgWU/V91VNP3pXoI/AAAAAAAACX4/iGPJmQ7rEc4Lfy_WNjHEo319HLW6TpXkACLcB/s1600/goyle.jpg" width = "300" height = "400">
				goyle&nbsp&nbsp&nbsp&nbsp
				<img src = "https://4.bp.blogspot.com/-na4yXU3yT38/V91VNMY4ZpI/AAAAAAAACX0/DiaMjXt1OhwG21DPnKNXQ6RFP301DRPegCLcB/s1600/gregorovitch.jpg" width = "300" height = "400">
				gregorovitch&nbsp&nbsp&nbsp&nbsp
				<img src = "https://3.bp.blogspot.com/-Ds-g_O0NU_s/V91VNT6RyRI/AAAAAAAACX8/3fAdrsXr1fonT2FzreNNLj-AYVq9dOXdwCLcB/s1600/greyback.jpg" width = "300" height = "400">
				greyback&nbsp&nbsp&nbsp&nbsp
				<img src = "https://1.bp.blogspot.com/-wdHLAKHQeOQ/V91VI3ua_HI/AAAAAAAACWU/s1V3t9pa7Bc3supRfMY8ofNwV-ULKDKRACLcB/s1600/Grindelwald.jpg" width = "300" height = "400">
				grindelwald&nbsp&nbsp&nbsp&nbsp
				<img src = "https://3.bp.blogspot.com/-WBJgDLGaO-s/V91VNh9qDoI/AAAAAAAACYE/ADUUVtghboIDVDMZsERJoSCVwVCM04FAwCLcB/s1600/hagrid.jpg" width = "300" height = "400">
				hagrid&nbsp&nbsp&nbsp&nbsp
				<img src = "https://3.bp.blogspot.com/-QHxZPbuvB38/V91VN23aboI/AAAAAAAACYA/Disq--ms7ekVpIzJc0pXFTLa9mpDdcW8QCLcB/s1600/hedwig.jpg" width = "300" height = "400">
				hedwig&nbsp&nbsp&nbsp&nbsp
				<img src = "https://4.bp.blogspot.com/-KgUEEvu2rO4/V91VI75JmJI/AAAAAAAACWc/jbl14Ua8gew861yB8XoMU_w61Up7A2PuQCLcB/s1600/Igor%2BKarkaroff.jpg" width = "300" height = "400">
				Igor Karkaroff&nbsp&nbsp&nbsp&nbsp
				<img src = "https://4.bp.blogspot.com/-0bEtwJx6C-A/V91VSlKlw9I/AAAAAAAACZo/wrNZC7gdWwIiEqEeIOYpSLoH-39EfvuLACLcB/s1600/james.jpg" width = "300" height = "400">
				james&nbsp&nbsp&nbsp&nbsp
				<img src = "https://3.bp.blogspot.com/-hVLE2MDR1nA/V91VS7RsStI/AAAAAAAACZs/nl6jd2BWvIoIHNqG5cCg18hwgHhGwV5WQCLcB/s1600/kreacher.jpg" width = "300" height = "400">
				kreacher&nbsp&nbsp&nbsp&nbsp
				<img src = "https://2.bp.blogspot.com/-72M4wjGSODo/V91VSzW8OwI/AAAAAAAACZw/o6_JX1TuGBcThvMxxWdDwdlhTG107H8-ACLcB/s1600/lee%2Bjordan.jpg" width = "300" height = "400">
				lee jordan&nbsp&nbsp&nbsp&nbsp
				<img src = "https://4.bp.blogspot.com/-QUTmpL9IysU/V91VTKExAXI/AAAAAAAACZ0/00B2ItGzmboT-NxEKJeIIK1XsQgY3H24QCLcB/s1600/lilly.jpg" width = "300" height = "400">
				lilly&nbsp&nbsp&nbsp&nbsp
				<img src = "https://3.bp.blogspot.com/-mJ8VQuZJlH0/V91VTY-zM5I/AAAAAAAACZ4/81BTPhpK_vMKrDqxe50ln-pOsZ2a80WjgCLcB/s1600/lucius.jpg" width = "300" height = "400">
				lucius&nbsp&nbsp&nbsp&nbsp
				<img src = "https://1.bp.blogspot.com/-rXjiPR6PIfs/V91VTdgzzUI/AAAAAAAACZ8/WZkGp8I0S9wWL2nUdzhUgKoPZCQMyJrYwCLcB/s1600/luna.jpg" width = "300" height = "400">
				luna&nbsp&nbsp&nbsp&nbsp
				<img src = "https://2.bp.blogspot.com/-asvxBJXV_mg/V91VT_RqLvI/AAAAAAAACaA/0P1Oe7JkAgQ2-Esf88RIS5bxO879E9FvgCLcB/s1600/lupin.jpg" width = "300" height = "400">
				lupin&nbsp&nbsp&nbsp&nbsp
				<img src = "https://2.bp.blogspot.com/-aUdYdEk-b30/V91VJel62aI/AAAAAAAACWg/jbHyrFSU_vkBF8MSXpnSyLVeMxOM8xUNgCLcB/s1600/Mcgonagall.jpg" width = "300" height = "400">
				Mcgonagall&nbsp&nbsp&nbsp&nbsp
				<img src = "https://3.bp.blogspot.com/-bQsVEekZfW4/V91VT8fWNLI/AAAAAAAACaI/2p3sEkuRJfcweovTp4uqPc2LjDH6vahqwCLcB/s1600/moody.jpg" width = "300" height = "400">
				moody&nbsp&nbsp&nbsp&nbsp
				<img src = "https://2.bp.blogspot.com/-Nn6_cM3C8Fk/V91VT4iIssI/AAAAAAAACaE/26QuS-AMRPg5_T53cnEdxS6GlZjIn5gJACLcB/s1600/mr%2Bweasley.jpg" width = "300" height = "400">
				mr weasley&nbsp&nbsp&nbsp&nbsp
				<img src = "https://1.bp.blogspot.com/-NYzCpTVErTU/V91VUSJuQeI/AAAAAAAACaM/nH6R6DR0L1o2EAYo5uUbF1nefmfmlk5XgCLcB/s1600/mrs%2Bweasley.jpg" width = "300" height = "400">
				mrs weasley&nbsp&nbsp&nbsp&nbsp
				<img src = "https://2.bp.blogspot.com/-bEdelIg6GvM/V91VUXfn44I/AAAAAAAACaU/s-EC5_XOoao6gwyqex44PgWl5XxTt6T0QCLcB/s1600/neville.jpg" width = "300" height = "400">
				neville&nbsp&nbsp&nbsp&nbsp
				<img src = "https://2.bp.blogspot.com/-lu2TrdRXLGo/V91VUxQlXfI/AAAAAAAACaY/NL20PSFP7IYi7KDfYRabCpYelnr2uoYEACLcB/s1600/percy.jpg" width = "300" height = "400">
				percy&nbsp&nbsp&nbsp&nbsp
				<img src = "https://3.bp.blogspot.com/-NBjobAGi3Rc/V91VVIRlzLI/AAAAAAAACag/hduVkAkGSBc-Mi4a04FRCDaIWIaa3cf3ACLcB/s1600/pettigrew.jpg" width = "300" height = "400">
				pettigrew&nbsp&nbsp&nbsp&nbsp
				<img src = "https://3.bp.blogspot.com/-cy9x1bInFnI/V91VVOr6s_I/AAAAAAAACac/aQH8s8ODSV8svJAY9eKnzixT0qJr7PY1wCLcB/s1600/petunia.jpg" width = "300" height = "400">
				petunia&nbsp&nbsp&nbsp&nbsp
				<img src = "https://3.bp.blogspot.com/-Qy15fk9CXDo/V91VVdlkX2I/AAAAAAAACak/iFSG0ms3674MI-Sn-ELQHl8m3IjcUbebACLcB/s1600/quirrel.jpg" width = "300" height = "400">
				quirrel&nbsp&nbsp&nbsp&nbsp
				<img src = "https://3.bp.blogspot.com/-ibNRjekoTj0/V91VVv7hziI/AAAAAAAACao/v_NYaVk21fEZdwIW5o64ppOCn5x8tppmgCLcB/s1600/rita%2Bskeeter.jpg" width = "300" height = "400">
				rita skeeter&nbsp&nbsp&nbsp&nbsp
				<img src = "https://3.bp.blogspot.com/-02tiD_XPr3s/V91VWEk9p4I/AAAAAAAACa4/PZDsZMlgFa4CSWOljkeSemvXlX4K5ZhvwCLcB/s1600/scabbers.jpg" width = "300" height = "400">
				scabbers&nbsp&nbsp&nbsp&nbsp
				<img src = "https://1.bp.blogspot.com/-j4SVBdM9eiI/V91VWtxN48I/AAAAAAAACa8/EklW05SR6KIgODUUTVbtIHMETlt4lIR3ACLcB/s1600/sirius.jpg" width = "300" height = "400">
				sirius&nbsp&nbsp&nbsp&nbsp
				<img src = "https://4.bp.blogspot.com/-8UZCGsU1Wz4/V91VWl1c2aI/AAAAAAAACbA/aU5e2mkkxsgT6JCKhEZRXpbrpsM69KipQCLcB/s1600/snape.jpg" width = "300" height = "400">
				snape&nbsp&nbsp&nbsp&nbsp
				<img src = "https://3.bp.blogspot.com/-Kkx3zUXa0t4/V91VW-1dDZI/AAAAAAAACbE/UHuFEZfXQ3055eNztmun4Z8XzdPmQQl6wCLcB/s1600/sprout.jpg" width = "300" height = "400">
				sprout&nbsp&nbsp&nbsp&nbsp
				<img src = "https://2.bp.blogspot.com/-HQuNFFB2fw4/V91VXM2ggCI/AAAAAAAACbM/xNyU96eo0UcAi_QFE0cCdvY5NEptNSctQCLcB/s1600/tonks.jpg" width = "300" height = "400">
				tonks&nbsp&nbsp&nbsp&nbsp
				<img src = "https://2.bp.blogspot.com/-viHXFqeSBZ8/V91VXiJHnkI/AAAAAAAACbU/zwSGCEsQzIE_SZC_opPpwAX_BruBQtq2gCLcB/s1600/umbridge.jpg" width = "300" height = "400">
				umbridge&nbsp&nbsp&nbsp&nbsp
				<img src = "https://4.bp.blogspot.com/--mKrn9K7hdY/V91VX5KGI0I/AAAAAAAACbc/7RG1zObg4d4lQTroxXMGkDWFksuXcvXiQCLcB/s1600/vernon.jpg" width = "300" height = "400">
				vernon&nbsp&nbsp&nbsp&nbsp
				<img src = "https://4.bp.blogspot.com/-LScCVFQMpdo/V91VJSsdXqI/AAAAAAAACWk/GFqPj6OBcZ8alwyp0O9s0gSmc1uNRNBnQCLcB/s1600/Viktor%2BKrum.jpg" width = "300" height = "400">
				Viktor krum&nbsp&nbsp&nbsp&nbsp
				<img src = "https://4.bp.blogspot.com/-qXEkXCo-TSA/V91VXGzOtwI/AAAAAAAACbI/lDv48cJavCoCWbiRON-gsRmmWh6bxJHHQCLcB/s1600/the%2Btrio%2Bin%2Bhp1.jpg" width = "300" height = "400">
				the trio in hp1
			</p>`,
		controls:`
			<p align = "left">
				<a href="article-five"><marquee scrollamount="5" width="40">&lt;&lt;&lt;</marquee>CHARACTERS</a>
			</p>`
	},
	'article-twelve': {
		title: 'Wands | Siddharth Hariprasad',
        heading: '<p align = "center"><marquee behavior="alternate"><h2>WANDS</h2></marquee></p>',
        content: ` 
			<p align = "center">
				<img src = "https://4.bp.blogspot.com/-op1YzeSZ1P4/V91VYbrFxeI/AAAAAAAACbo/f1izgEC5taYDfFiglJax-QFg4OnYcHM0gCLcB/s1600/wand%2Bhp.jpg" alt = "Harry's wand" width = "300" height = "400">(Harry's wand)<br>
			</p>
			<p>
				A wand is a wooden stick-like object used to channel magical energy and thus increase 
				its power, and without which only limited magic is possible. Wands are used as both 
				tools and weapons in the wizarding world. They are thus an important aspect of nearly 
				all magic, and great importance is placed on wand mastery. Wands are generally carried 
				inside the wizard's robes or otherwise somewhere on their person; however, they can also 
				be placed into other objects. For instance, Rubeus Hagrid hid the broken halves of his 
				wand inside his umbrella, and in the film adaptations, Lucius Malfoy hides his wand in 
				his cane. In the magical world, when a wizard is expelled from Hogwarts, their wands are 
				snapped in half. This type of damage to a wand is nearly irreparable, though Harry is able 
				to mend his wand, which was accidentally broken by Hermione, with the help of the powerful 
				Elder Wand.			
			</p>
			<p>
				A wand is made by a wandmaker who is learned in wandlore, the study of wands. Wands are 
				handcrafted from high-quality woods, or "wandwoods", which are capable of sustaining magic 
				(e.g. holly, yew, ebony, vinewood, mahogany, cherry, oak, etc.). A core is then inserted 
				into the middle of the wand from top to bottom. Common cores include phoenix tail feathers, 
				unicorn tail hairs, and dragon heartstrings. Veela hair is also used, but less commonly. In 
				the Deathly Hallows, the Elder Wand is described as the only wand with a core made from the 
				tail hair of a Thestral.The only wand shop seen in the books is Ollivanders. Garrick Ollivander 
				is a wandmaker who has an eidetic memory concerning wands, as well as the ability to identify the 
				distinguishing features of a wand.
			</p>
			<p>
				A wand is generally considered a very personal object. Wands belonging to other wizards can be 
				borrowed, resulting in a comparatively less potent effect. In Philosopher's Stone, Harry had to 
				try out many wands before he found one that "chose him." Wands with cores from the same source 
				give strange effects (Priori Incantatem) when forced to fight each other, as is the case with 
				Harry and Voldemort's wands. In Goblet of Fire, it is revealed each of their wands contains a 
				tail feather from Fawkes, the phoenix belonging to Dumbledore. After Priori Incantatem, the wands 
				get to know the opposites' master, as explained in Deathly Hallows. While, according to Ollivander, 
				any object can channel magic if the wizard is strong enough, wands are the most commonly used because 
				of their efficiency (due to the owner's bond with the wand itself). This can explain how some wizards 
				are able to use spells without wands (for example, retrieving an item with Accio).Furthermore, wands 
				are able to be won from a witch or wizard and can therefore change their allegiance. This is the case 
				when Harry takes Draco's wand at Malfoy Manor, and consequently the wand's allegiance swaps to Harry, 
				as explained by Ollivander; and, by extension, so does the allegiance of the Elder Wand,which itself 
				has changed hands many times.
			</p>
			<p align = "center">
				<img src = "https://1.bp.blogspot.com/-HHOV3rWTpDA/V91VYWmAyUI/AAAAAAAACbk/t8hde-W9d6kRvMF6BQI3YBggET51ymY8ACLcB/s1600/wand%2Bhg.jpg" alt = "Hermione's wand" width = "300" height = "400">(Hermione's wand)
				&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
				<img src = "https://2.bp.blogspot.com/-eUzxllqTxbM/V91VY_xOUZI/AAAAAAAACbs/n00w7ZaA4uwkU_PbPXf9XBHJt0ojASCWgCLcB/s1600/wand%2Brw.jpg" alt = "Ron's wand" width = "300" height = "400">(Ron's wand)
			</p>`,
		controls:`
			<p align = "left">
				<a href="article-five"><marquee scrollamount="5" width="40">&lt;&lt;&lt;</marquee>CHARACTERS</a>
 			</p>`
	},
};

function createTemplate (data){
    var title = data.title;
    var heading = data.heading;
    var date = data.date;
    var content = data.content;
	var controls = data.controls;
    var htmlTemplate = `
        <html>
            <head>
                <title>${title}</title>
				<link rel="icon" href="https://3.bp.blogspot.com/-3MLoeceCyek/V90X0MQhZYI/AAAAAAAACV8/QHO8sLeEZpo18KUjZOHP6Xey9UVCdH7_wCLcB/s1600/Sid_Editz_Logo_new.png">
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link href="/ui/style.css" rel="stylesheet" />
            </head>
            <body>
                <div class="container">
                    <div class="head">
                        <a href="/"><marquee scrollamount="5" width="40">&lt;&lt;&lt;</marquee>Home</a>
                    </div>
                    <hr/>
					<div class = "head">
						<h1>
							${heading}
						</h1>
					</div>
					<hr/>
                    <div>
                       ${content}
                    </div>
					<div class = "head">
						${controls}
					</div>
				 </div>
            </body>
        </html>
        `;
        return htmlTemplate;
}

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

var pool = new Pool(config);
app.get('/test-db', function (req, res) {
    //make a select request
    // return a response with results
    pool.query('SELECT * FROM test', function (err, result){
       if(err) {
           res.status(500).send(err.toString());
       } 
       else {
           res.send(JSON.stringify(result.rows));
       }
    });
});


var counter = 0;
app.get('/counter',function (req, res){
    counter = counter + 1;
    res.send(counter.toString());
});

var names = [];
app.get('/submit-name',function (req, res) {
	//get the name frm req
	var name = req.query.name;
	
	names.push(name);
	
	res.send(JSON.stringify(names));
});

app.get('/:articleName',function (req, res){
    var articleName = req.params.articleName;
    res.send(createTemplate(articles[articleName]));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/Sid.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'Sid.png'));
});

app.get('/ui/hp.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'hp.jpg'));
});

var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
