import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ChatBot, { Loading } from 'react-simple-chatbot';
import axios from 'axios';
import MKButton from "components/MKButton";
import { ThemeProvider } from 'styled-components';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import { CopyToClipboard } from "react-copy-to-clipboard";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';
class BackendQueryComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      result: '',
      trigger: false,
    };

    this.triggetNext = this.triggetNext.bind(this);
  }

  async componentDidMount() {
    const self = this;
    const { steps } = this.props;
    const search = steps.search.value;

    try {
      const response = await axios.post('http://localhost:8008/get_chatbot_answer', {
        question: search,
      });

      const result = response.data; // Modify this according to your response structure

      self.setState({ loading: false, result });
    } catch (error) {
      console.error('Error fetching data:', error);
      self.setState({ loading: false, result: 'Error fetching data.' });
    }
  }

  triggetNext() {
    this.setState({ trigger: true }, () => {
      this.props.triggerNextStep();
    });
  }

  handleCopyClick = () => {
    this.setState({ isIconChanged: true });

    setTimeout(() => {
      this.setState({ isIconChanged: false });
    }, 2000);
  };

  render() {
    const { trigger, loading, result , isIconChanged } = this.state;



    return (
		<div className="backend-query" style={{ backgroundColor: "#5082ba !important" }}>
        { loading ? <Loading /> : <div 
        style={{display: 'flex',
            justifyContent: 'space-between', fontSize: "14px" , backgroundColor: "#5082ba",  borderRadius: "18px 18px 18px 0", color:"white",marginRight:"10%",// Top left, top right, bottom right, bottom left
    padding: "10px", }}>
      <CopyToClipboard text = {result}>
        <MKButton type = "button"
                  variant ="gradient"
                  color = "dark"
                  iconOnly = {true}
                  circular = {true}
                  size = "small"
                  onClick={this.handleCopyClick}
                  >
          {isIconChanged ? <CheckIcon /> : <ContentCopyIcon />}
        </MKButton>
      </CopyToClipboard><div><span>&nbsp;&nbsp;</span>{result}</div></div> }
        {
          !loading &&
          <div
            style={{
            //   textAlign: 'left',
              marginTop: 20,
            }}
          >
            {
              !trigger &&
			  <Stack direction="row" alignItems="flex-end" spacing={0}>
				<Grid xs={6}>
					<p style = {{fontSize:"14px"}}>evaluate to continue</p>
				</Grid>
				<Grid xs={2}>
				<MKButton
				type = "button"
				color = "dark"
				iconOnly = {true}
				circular = {true}
				size = "small"
                onClick={() => this.triggetNext()}
              >
                <ThumbUpIcon/>
              </MKButton>
				</Grid>

				<Grid xs={2}>
				<MKButton
				type = "button"
				color = "dark"
				iconOnly = {true}
				circular = {true}
				size = "small"
                onClick={() => this.triggetNext()}
              >
                <ThumbDownIcon/>
              </MKButton>
				</Grid>
              
			  </Stack>
            }
          </div>
        }
      </div>
    );
  }
}


class BackendQueryComponentForNlp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      result: '',
      trigger: false,
    };

    this.triggetNext = this.triggetNext.bind(this);
  }

  async componentDidMount() {
    const self = this;
    const { steps } = this.props;
    const search = steps.search_nlp.value;

    try {
      const response = await axios.post('http://localhost:8008/get_chatbot_answer_nlp', {
        question: search,
      });

      const result = response.data; // Modify this according to your response structure

      self.setState({ loading: false, result });
    } catch (error) {
      console.error('Error fetching data:', error);
      self.setState({ loading: false, result: 'Error fetching data.' });
    }
  }

  triggetNext() {
    this.setState({ trigger: true }, () => {
      this.props.triggerNextStep();
    });
  }

  handleCopyClick = () => {
    this.setState({ isIconChanged: true });

    setTimeout(() => {
      this.setState({ isIconChanged: false });
    }, 2000);
  };

  render() {
    const { trigger, loading, result , isIconChanged } = this.state;



    return (
		<div className="backend-query" style={{ backgroundColor: "#5082ba !important" }}>
        { loading ? <Loading /> : <div 
        style={{display: 'flex',
            justifyContent: 'space-between', fontSize: "14px" , backgroundColor: "#5082ba",  borderRadius: "18px 18px 18px 0", color:"white",marginRight:"10%",// Top left, top right, bottom right, bottom left
    padding: "10px", }}>
      <CopyToClipboard text = {result}>
        <MKButton type = "button"
                  variant ="gradient"
                  color = "dark"
                  iconOnly = {true}
                  circular = {true}
                  size = "small"
                  onClick={this.handleCopyClick}
                  >
          {isIconChanged ? <CheckIcon /> : <ContentCopyIcon />}
        </MKButton>
      </CopyToClipboard><div><span>&nbsp;&nbsp;</span>{result}</div></div> }
        {
          !loading &&
          <div
            style={{
            //   textAlign: 'left',
              marginTop: 20,
            }}
          >
            {
              !trigger &&
			  <Stack direction="row" alignItems="flex-end" spacing={0}>
				<Grid xs={6}>
					<p style = {{fontSize:"14px"}}>evaluate to continue</p>
				</Grid>
				<Grid xs={2}>
				<MKButton
				type = "button"
				color = "dark"
				iconOnly = {true}
				circular = {true}
				size = "small"
                onClick={() => this.triggetNext()}
              >
                <ThumbUpIcon/>
              </MKButton>
				</Grid>

				<Grid xs={2}>
				<MKButton
				type = "button"
				color = "dark"
				iconOnly = {true}
				circular = {true}
				size = "small"
                onClick={() => this.triggetNext()}
              >
                <ThumbDownIcon/>
              </MKButton>
				</Grid>
              
			  </Stack>
            }
          </div>
        }
      </div>
    );
  }
}

BackendQueryComponent.propTypes = {
  steps: PropTypes.object,
  triggerNextStep: PropTypes.func,
};

BackendQueryComponent.defaultProps = {
  steps: undefined,
  triggerNextStep: undefined,
};


BackendQueryComponentForNlp.propTypes = {
  steps: PropTypes.object,
  triggerNextStep: PropTypes.func,
};

BackendQueryComponentForNlp.defaultProps = {
  steps: undefined,
  triggerNextStep: undefined,
};

	// Creating our own theme
	const theme = {
		background: 'white',
		headerBgColor: '#1b4080',
		headerFontSize: '20px',
		botBubbleColor: '#5082ba',
		userBubbleColor: '#dae4e8',
		headerFontColor: 'white',
		botFontColor: 'white',
		userFontColor: 'black',
	};

const ExampleBackendQuery = () => (
	<ThemeProvider theme={theme}>
  <ChatBot floating headerTitle="3DSF ChatBot"
    steps={[
      {
        id: '1',
        message: "Hello! I'm here to assist you with any questions you have about Data Science OR NLP. Please choose an option?",
        trigger: 'option',
      },
      {
        id: 'option',
        options: [
          { value: 1, label: 'Data Science', trigger: '2' },
          { value: 2, label: 'NLP', trigger: 'nlpTrigger' },
        ],
      },
      {
        id: '2',
        message: "Is there a specific topic or question you'd like to know more about in the realm of Data science? Feel free to ask, and I'll do my best to provide you with a helpful answer.",
        trigger: 'search',
      },
      {
        id: 'nlpTrigger',
        message: "Is there a specific topic or question you'd like to know more about in the realm of NLP? Feel free to ask, and I'll do my best to provide you with a helpful answer.",
        trigger: 'search_nlp',
      },
      {
        id: 'search',
        user: true,
        trigger: '3',
      },
      {
        id: 'search_nlp',
        user: true,
        trigger: 'result_nlp',
      },
      {
        id: '3',
        component: <BackendQueryComponent />,
        waitAction: true,
        trigger: '2',
      },
      {
        id: 'result_nlp',
        component: <BackendQueryComponentForNlp />,
        waitAction: true,
        trigger: 'nlpTrigger',
      },
    ]}
  />
  </ThemeProvider>
);

export default ExampleBackendQuery;
