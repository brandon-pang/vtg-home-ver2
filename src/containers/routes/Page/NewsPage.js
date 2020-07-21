import React, { Component } from "react";
import _ from "lodash";
import axios from 'axios';
import MastHead from "../../../components/MastHead/mastHead";
import NewsCard from "../../../components/NewsCard/newsCard";
import SnsCard from "../../../components/SnsCard/snsCard";
import ScrollView, { ScrollElement } from "../../../components/ScrollView/scroller";
import NavToTop from "../../../components/NavToTop/navToTop";
import Loader from "../../../components/Loading/loading";

import newsImage from "../../../assets/images/bg/bg_main_news.png";
import bsGlbLogo from "../../../assets/images/acsy/blackshot_glb_logo.png";
import bsSeaLogo from "../../../assets/images/acsy/blackshot-sea-gnb.png";
import uwoLogo from "../../../assets/images/acsy/uwo-logo.png";
import lataleLogo from "../../../assets/images/acsy/latale-logo.png";
import wrLogo from "../../../assets/images/acsy/warrock-logo.png";
import dkLogo from "../../../assets/images/acsy/dekaron-logo.png";
import right_pagenationBtn from "../../../assets/images/acsy/btn_num_r.png";
import left_pagenationBtn from "../../../assets/images/acsy/btn_num_l.png";
import left_page_disable from "../../../assets/images/acsy/btn_boxarrow_l_disable.png"
import right_page_disable from "../../../assets/images/acsy/btn_boxarrow_r_disable.png"


import "./pageStyle/newsPage.scss";

class NewsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      activePage: true,
      newsPerPage: 6,
      dataRoute: 'http://cms.vertigogames.com/cms/wp-json/wp/v2/posts',
      originArr: [],
      newsInitialArr: [],
      snsInitialArr: [],
      newsPageData: [],
      snsCardImg: '',
      loading: true,
      nextPageDisable: false,
      prevPageDisable: false,
      loadNews: false
    }
    this.handlePageClick = this.handlePageClick.bind(this);
    this.fetchWPPost = this.fetchWPPost.bind(this);
    this.editfetchedData = this.editfetchedData.bind(this);
    this.scrollTo = this.scrollTo.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.selectGameImage = this.selectGameImage.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    this.fetchWPPost();
    if (this.state.currentPage === 1) {
      this.setState({ prevPageDisable: true });
    }
  }

  componentDidUpdate(prveProps, prevState) {
    if (prevState.originArr !== this.state.originArr) {
      this.editfetchedData(this.state.originArr);
    }
  }

  componentWillUnmount() {
    this.signal.cancel('news api is being canceled');
  }

  handlePageClick = (event) => {
    this.setState({ currentPage: Number(event.target.id) })
  }

  signal = axios.CancelToken.source();
  // fetch WP post
  fetchWPPost = async () => {
    try {
      this.setState({ loadNews: true })
      await axios.get(this.state.dataRoute, {
        params: { per_page: 100 }, cancelToken: this.signal.token
      })
        .then(res => {
          // categorize 10 = news
          // sort array use filter
          this.setState({ originArr: res.data })
        }) 
    } catch(err) {
      if (axios.isCancel(err)) {
        console.log('Error: ', err.message); // => prints: Api is being canceled
      } else {
        this.setState({ loadNews: false })
      }
    }
  }

  editfetchedData = (originArr) => {
    //console.log(originArr);
    // category number '2' = news
    // category number '6' = sns
    // filtered arrays
    const sortNewsData = _.filter(originArr, ['categories', [2]])
    //console.log('news', sortNewsData);
    const sortSnsData = _.filter(originArr, ['categories', [6]])
    //console.log('sns', sortSnsData);
    // merge arrays
    const mergedData = _.concat(sortNewsData, sortSnsData);
    //console.log('merged', mergedData);
    // sort data by ascending order and reverse the object
    const sortedData = _.sortBy(mergedData, ['date']).reverse();
    this.setState({
      loading: false,
      newsPageData: sortedData
    })
  }

  selectGameImage = (gt) => {
    if (gt === 'Blackshot South East Asia') {
      return bsSeaLogo
    } else if (gt === 'Blackshot Global') {
      return bsGlbLogo
    } else if (gt === 'Uncharted Water Online') {
      return uwoLogo
    } else if (gt === 'War Rock') {
      return wrLogo
    } else if (gt === 'Dekaron') {
      return dkLogo
    } else if (gt === 'LaTale') {
      return lataleLogo
    }
  }


  // scroll to section
  scrollTo = (title) => {
    this._scroller.scrollTo(title, 500);
  }

  nextPage = () => {
    const { newsPageData, newsPerPage, currentPage } = this.state;
    //console.log(currentPage);
    if (currentPage < Math.ceil(newsPageData.length / newsPerPage)) {
      this.setState({ currentPage: currentPage + 1, nextPageDisable: true, prevPageDisable: false  })
    } else {
      //console.log(currentPage);
      this.setState({ currentPage: currentPage });
    }
  }

  previousPage = () => {
    if (this.state.currentPage <= 0) {
      this.setState({ currentPage: 1 })
    } else {
      this.setState({ currentPage: this.state.currentPage - 1, prevPageDisable: true, nextPageDisable: false })
    }
  }

  render() {

    const { currentPage, newsPerPage, loading, newsPageData, prevPageDisable, nextPageDisable } = this.state;
    // const { mobileSize, tabletSize, json } = this.props;
    const { mobileSize, json } = this.props;

    const title = json.newspage_top_seciton_title;
    const subtitle = json.newspage_top_seciton_subtitle;

    // active page number style
    const activePageStyle = {
      color: '#000',
      fontWeight: '600'
    }


    // displaying cards
    const indexOfLastCards = currentPage * newsPerPage;
    const indexOfFirstCards = indexOfLastCards - newsPerPage;

    // slice array
    const currentNewsCards = newsPageData.slice(indexOfFirstCards, indexOfLastCards);
    //console.log(currentNewsCards);
    // display page number
    let pageNumbers = []
    for (let i = 1; i <= Math.ceil(newsPageData.length / newsPerPage); i++) {
      pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map(arr => {
      return (
        <a
          className="pageNumber"
          key={arr}
          id={arr}
          style={currentPage === arr ? activePageStyle : null}
          onClick={(e) => this.handlePageClick(e)}
        >
          {arr}
        </a>
      )
    })


    return (
      <ScrollView ref={scroller => this._scroller = scroller}>
        <div className="news_container">
          <ScrollElement title={'top'}>
            <div className="dim_layer" />
          </ScrollElement>
          <MastHead
            bgImage={newsImage}
            title={title}
            subtitle={subtitle}
            scrollTo={this.scrollTo}
            below={'newspage'}
          />
          <ScrollElement title="newspage">
            <div className="newspage_top"></div>
          </ScrollElement>
          <div className="news_cards_container">
          {
            loading ? <Loader />
          :
          
            <div className="news_cards_inner_container">
              {_.map(currentNewsCards,
                    ({ post_date, facebook_link, tweeter_link, game_title, game_original_link, news_image, news_tag, title, news_publisher, news_publish_date, content, news_origin_link }, index) => {
                  if (game_original_link) {
                    return (
                      <SnsCard
                        bgImg={this.selectGameImage(game_title)}
                        size="large"
                        key={index}
                        title={title.rendered}
                        desc={content.rendered}
                        gameTitle={game_title}
                        date={post_date}
                        fbLink={facebook_link}
                        twLink={tweeter_link}
                        gameOriginLink={game_original_link}
                      />
                    )
                  } else {
                    return (
                      <NewsCard
                        size="large"
                        key={index}
                        bgImg={mobileSize ? null : news_image}
                        tag={news_tag}
                        title={title.rendered}
                        publisher={news_publisher}
                        date={news_publish_date}
                        desc={content.rendered}
                        link={news_origin_link}
                      />
                    )
                  }
                })}
            </div>
          }
          </div>
          <div className="page_number_wrapper">
            <button className="previousPageBtn_wrapper">
              {prevPageDisable ? 
                <img className="prevPageBtn" src={left_page_disable} alt="preBtn" />
                :
                <img className="prevPageBtn" src={left_pagenationBtn} alt="preBtn" onClick={this.previousPage} />
              }
              
            </button>
            {renderPageNumbers}
            <button className="nextPageBtn_wrapper">
              {nextPageDisable ?
                <img className="nextPageBtn" src={right_page_disable} alt="nextBtn" />
                :
                <img className="nextPageBtn" src={right_pagenationBtn} alt="nextBtn" onClick={this.nextPage} />
              }
            </button>
          </div>
          <div className="last_section_nav">
            <NavToTop scrollTo={this.scrollTo} top={'top'} />
          </div>
        </div>
      </ScrollView>
    );
  }
}

export default NewsPage;
