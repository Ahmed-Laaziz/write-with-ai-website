import * as React from 'react';
import axios from "axios";
import { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TranslateIcon from '@mui/icons-material/Translate';
import Button from '@mui/material/Button';
import Stack from "@mui/material/Stack";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import MKBox from 'components/MKBox';
import { CopyToClipboard } from "react-copy-to-clipboard";
import MKButton from "components/MKButton";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';

const theme = createTheme({
    palette: {
      customColor: {
        main: '#2188AF', // Replace with your desired color value
      },
    },
  });


export default function Translate({textToTranslate}) {

    const [srcLanguage, setSrcLanguage] = useState("eng_Latn")
    const [tgtLanguage, setTgtLanguage] = useState("fra_Latn")
    const [srcCountryCode, setSrcCountryCode] = useState("GB")
    const [tgtCountryCode, setTgtCountryCOde] = useState("FR")
    const [texttotranslate, setTextToTranslate] = useState(textToTranslate);
  const [generatedTranslation, setGeneratedTranslation] = useState(""); // State to store the generated abstract
  const [isTranslationGenerated, setIsTranslationGenerated] = useState(false);
  // State to indicate whether the backend request is in progress
  const [isLoading, setIsLoading] = useState(false);
  const [isIconChanged, setIsIconChanged] = useState(false);

  const handleCopyClick = () => {
    setIsIconChanged(true);

    setTimeout(() => {
        setIsIconChanged(false)
    }, 2000);
  };

    const fetchTranslation = async () => {
        setGeneratedTranslation("")
        try {
          // Show the spinner while the backend request is in progress
          setIsLoading(true);
          setIsTranslationGenerated(false);
          const url = "http://localhost:8008/get_translation"; // URL for the backend API
          const requestData = {
            text: texttotranslate, // Send the user input as a parameter in the request body
            // words_to_generate: wordsNumber,
            src: srcLanguage,
            tgt: tgtLanguage,
          };
    
          // Make a POST request to your backend API
          const response = await axios.post(url, requestData);
    
          // Assuming the response contains the generated abstract text as a string
          const generatedTranslation = response.data;
    
          // Update the generated abstract in the state
          setGeneratedTranslation(generatedTranslation);
          //setTran(generatedAbstractText);
    
         // console.log("res : " + generatedAbstract);
          console.log(requestData);
        } catch (error) {
          console.error("Error fetching abstract:", error);
        } finally {
          // Hide the spinner after the backend request is completed
          setIsLoading(false);
          setIsTranslationGenerated(true);
        }
      };

  return (
    <Box>
    <ThemeProvider theme={theme}>
      <TextField
        // label="Outlined custom color"
        color="customColor" // Use the custom color you defined
        focused
        defaultValue={textToTranslate}
        multiline
        placeholder='Type your text here...'
        rows={3}
        sx={{ width: '100%', marginBottom: '3%' }}
        onChange={(e) => setTextToTranslate(e.target.value)} 
      />
    </ThemeProvider>
    <Stack direction="row" alignItems="flex-end" spacing={1}>
    
    <MKBox width="7%">
    <img
      loading="lazy"
      width="100%"
      src={`https://flagcdn.com/w20/${srcCountryCode.toLocaleLowerCase()}.png`}
      srcSet={`https://flagcdn.com/w40/${srcCountryCode.toLocaleLowerCase()}.png 2x`}
      alt=""
      style={{marginBottom:"50%"}}
    />
  </MKBox>
    <Autocomplete
      id="country-select-demo-1"
      sx={{ width: "100%" }}
      value={languages.find(option => option.id === srcLanguage)} // Set the default value based on srcLanguage
      options={languages}
      onChange={(event, option) => {
        if (option) {
          setSrcLanguage(option.id);
          setSrcCountryCode(option.code)
        }
      }} 
      autoHighlight
      getOptionLabel={(option) => option.label}
      renderOption={(props, option) => (
        <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
          <img
            loading="lazy"
            width="20"
            src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
            srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
            alt=""
          />
          {option.label} ({option.code}) {option.id}
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label="From"
          inputProps={{
            ...params.inputProps,
            autoComplete: 'new-password', // disable autocomplete and autofill
          }}
        />
      )}
    />
    <Autocomplete
      id="country-select-demo"
      sx={{ width: "100%" }}
      options={languages}
      value={languages.find(option => option.id === tgtLanguage)} // Set the default value based on srcLanguage
      autoHighlight
      onChange={(event, option) => {
        if (option) {
          setTgtLanguage(option.id);
          setTgtCountryCOde(option.code)
        }
      }} 
      getOptionLabel={(option) => option.label}
      renderOption={(props, option) => (
        <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
          <img
            loading="lazy"
            width="20"
            src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
            srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
            alt=""
          />
          {option.label} ({option.code}) {option.id}
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label="To"
          inputProps={{
            ...params.inputProps,
            autoComplete: 'new-password', // disable autocomplete and autofill
          }}
        />
      )}
    />
    <MKBox width="7%">
    <img
      loading="lazy"
      width="100%"
      src={`https://flagcdn.com/w20/${tgtCountryCode.toLocaleLowerCase()}.png`}
      srcSet={`https://flagcdn.com/w40/${tgtCountryCode.toLocaleLowerCase()}.png 2x`}
      alt=""
      style={{marginBottom:"50%"}}
    />
    </MKBox>
    </Stack>
    <ThemeProvider theme={theme}>
      <TextField
        // label="Outlined custom color"
        color="customColor" // Use the custom color you defined
        multiline
        rows={3}
        value={generatedTranslation}
        sx={{ width: '100%', marginTop: '3%' }}
      />
    </ThemeProvider>
    {/* <Stack direction="row" alignItems="flex-end" spacing={1}> */}
    {isTranslationGenerated && (
        <Grid container item xs={12} my={2} justifyContent="center">
          <CopyToClipboard text={generatedTranslation}>
          <MKButton type = "button"
                  variant ="gradient"
                color="secondary"
                  iconOnly = {true}
                  circular = {true}
                  size = "small"
                  onClick={handleCopyClick}
                  >
          {isIconChanged ? <CheckIcon /> : <ContentCopyIcon />}
        </MKButton>
          </CopyToClipboard>
        </Grid>
      )}
    <ThemeProvider theme={theme}>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop:"3%"}}>
        <Button
          variant="contained"
          color="customColor" // Use the custom color you defined
          sx={{ width: '25%' ,color: '#FFFFFF' }}
          onClick={fetchTranslation}
          disabled={isLoading}
        >
          <TranslateIcon fontSize='small'/>&nbsp;Translate
        </Button>
      </div>
    </ThemeProvider>

    {/* </Stack> */}

      
     {/* Conditional rendering for the spinner */}
     {isLoading && (
        <Grid container item xs={12} my={2} justifyContent="center">
          <CircularProgress color="inherit" />
        </Grid>
      )}
      
    </Box>
  );
}
Translate.propTypes = {
    textToTranslate: PropTypes.string.isRequired,
  };

// From https://bitbucket.org/atlassian/atlaskit-mk-2/raw/4ad0e56649c3e6c973e226b7efaeb28cb240ccb0/packages/core/select/src/data/countries.js
const languages = [
    { id: 'ace_Arab', label: 'Acehnese (Arabic script)', code: 'ID' },
    { id: 'ace_Latn', label: 'Acehnese (Latin script)', code: 'ID' },
    { id: 'acm_Arab', label: 'Mesopotamian Arabic', code: 'IQ' },
    { id: 'acq_Arab', label: 'Ta’izzi-Adeni Arabic', code: 'YE' },
    { id: 'aeb_Arab', label: 'Tunisian Arabic', code: 'TN' },
    { id: 'afr_Latn', label: 'Afrikaans', code: 'ZA' },
    { id: 'ajp_Arab', label: 'South Levantine Arabic', code: 'PS' },
    { id: 'aka_Latn', label: 'Akan', code: 'GH' },
    { id: 'amh_Ethi', label: 'Amharic', code: 'ET' },
    { id: 'apc_Arab', label: 'North Levantine Arabic', code: 'SY' },
    { id: 'arb_Arab', label: 'Standard Arabic', code: 'SA' },
    { id: 'arb_Latn', label: 'Modern Standard Arabic (Romanized)', code: 'SA' },
    { id: 'ars_Arab', label: 'Najdi Arabic', code: 'SA' },
    { id: 'ary_Arab', label: 'Moroccan Arabic', code: 'MA' },
    { id: 'arz_Arab', label: 'Egyptian Arabic', code: 'EG' },
    { id: 'asm_Beng', label: 'Assamese', code: 'IN' },
    { id: 'ast_Latn', label: 'Asturian', code: 'ES' },
    { id: 'awa_Deva', label: 'Awadhi', code: 'IN' },
    { id: 'ayr_Latn', label: 'Central Aymara', code: 'BO' },
    { id: 'azb_Arab', label: 'South Azerbaijani', code: 'IR' },
    { id: 'azj_Latn', label: 'North Azerbaijani', code: 'AZ' },
    { id: 'bak_Cyrl', label: 'Bashkir', code: 'RU' },
    { id: 'bam_Latn', label: 'Bambara', code: 'ML' },
    { id: 'ban_Latn', label: 'Balinese', code: 'ID' },
    { id: 'bel_Cyrl', label: 'Belarusian', code: 'BY' },
    { id: 'bem_Latn', label: 'Bemba', code: 'ZM' },
    { id: 'ben_Beng', label: 'Bengali', code: 'BD' },
    { id: 'bho_Deva', label: 'Bhojpuri', code: 'IN' },
    { id: 'bjn_Arab', label: 'Banjar (Arabic script)', code: 'ID' },
    { id: 'bjn_Latn', label: 'Banjar (Latin script)', code: 'ID' },
    { id: 'bod_Tibt', label: 'Standard Tibetan', code: 'CN' },
    { id: 'bos_Latn', label: 'Bosnian', code: 'BA' },
    { id: 'bug_Latn', label: 'Buginese', code: 'ID' },
    { id: 'bul_Cyrl', label: 'Bulgarian', code: 'BG' },
    { id: 'cat_Latn', label: 'Catalan', code: 'ES' },
    { id: 'ceb_Latn', label: 'Cebuano', code: 'PH' },
    { id: 'ces_Latn', label: 'Czech', code: 'CZ' },
    { id: 'cjk_Latn', label: 'Chokwe', code: 'AO' },
    { id: 'ckb_Arab', label: 'Central Kurdish', code: 'IQ' },
    { id: 'crh_Latn', label: 'Crimean Tatar', code: 'UA' },
    { id: 'cym_Latn', label: 'Welsh', code: 'GB' },
    { id: 'dan_Latn', label: 'Danish', code: 'DK' },
    { id: 'deu_Latn', label: 'German', code: 'DE' },
    { id: 'dik_Latn', label: 'Southwestern Dinka', code: 'SS' },
  { id: 'dyu_Latn', label: 'Dyula', code: 'CI' },
  { id: 'dzo_Tibt', label: 'Dzongkha', code: 'BT' },
  { id: 'ell_Grek', label: 'Greek', code: 'GR' },
  { id: 'eng_Latn', label: 'English', code: 'GB' },
  { id: 'epo_Latn', label: 'Esperanto', code: 'EO' },
  { id: 'est_Latn', label: 'Estonian', code: 'EE' },
  { id: 'eus_Latn', label: 'Basque', code: 'ES' },
  { id: 'ewe_Latn', label: 'Ewe', code: 'TG' },
  { id: 'fao_Latn', label: 'Faroese', code: 'FO' },
  { id: 'fij_Latn', label: 'Fijian', code: 'FJ' },
  { id: 'fin_Latn', label: 'Finnish', code: 'FI' },
  { id: 'fon_Latn', label: 'Fon', code: 'BJ' },
  { id: 'fra_Latn', label: 'French', code: 'FR' },
  { id: 'fur_Latn', label: 'Friulian', code: 'IT' },
  { id: 'fuv_Latn', label: 'Nigerian Fulfulde', code: 'NG' },
  { id: 'gla_Latn', label: 'Scottish Gaelic', code: 'GB' },
  { id: 'gle_Latn', label: 'Irish', code: 'IE' },
  { id: 'glg_Latn', label: 'Galician', code: 'ES' },
  { id: 'grn_Latn', label: 'Guarani', code: 'PY' },
  { id: 'guj_Gujr', label: 'Gujarati', code: 'IN' },
  { id: 'hat_Latn', label: 'Haitian Creole', code: 'HT' },
  { id: 'hau_Latn', label: 'Hausa', code: 'NG' },
  { id: 'heb_Hebr', label: 'Hebrew', code: 'IL' },
  { id: 'hin_Deva', label: 'Hindi', code: 'IN' },
  { id: 'hne_Deva', label: 'Chhattisgarhi', code: 'IN' },
  { id: 'hrv_Latn', label: 'Croatian', code: 'HR' },
  { id: 'hun_Latn', label: 'Hungarian', code: 'HU' },
  { id: 'hye_Armn', label: 'Armenian', code: 'AM' },
  { id: 'ibo_Latn', label: 'Igbo', code: 'NG' },
  { id: 'ilo_Latn', label: 'Ilocano', code: 'PH' },
  { id: 'ind_Latn', label: 'Indonesian', code: 'ID' },
  { id: 'isl_Latn', label: 'Icelandic', code: 'IS' },
  { id: 'ita_Latn', label: 'Italian', code: 'IT' },
  { id: 'jav_Latn', label: 'Javanese', code: 'ID' },
  { id: 'jpn_Jpan', label: 'Japanese', code: 'JP' },
  { id: 'kab_Latn', label: 'Kabyle', code: 'DZ' },
  { id: 'kac_Latn', label: 'Jingpho', code: 'MM' },
  { id: 'kam_Latn', label: 'Kamba', code: 'KE' },
  { id: 'kan_Knda', label: 'Kannada', code: 'IN' },
  { id: 'kas_Arab', label: 'Kashmiri (Arabic script)', code: 'IN' },
  { id: 'kas_Deva', label: 'Kashmiri (Devanagari script)', code: 'IN' },
  { id: 'kat_Geor', label: 'Georgian', code: 'GE' },
  { id: 'knc_Arab', label: 'Central Kanuri (Arabic script)', code: 'NG' },
  { id: 'knc_Latn', label: 'Central Kanuri (Latin script)', code: 'NG' },
  { id: 'kaz_Cyrl', label: 'Kazakh', code: 'KZ' },
  { id: 'kbp_Latn', label: 'Kabiyè', code: 'TG' },
  { id: 'kea_Latn', label: 'Kabuverdianu', code: 'CV' },
  { id: 'khm_Khmr', label: 'Khmer', code: 'KH' },
  { id: 'kik_Latn', label: 'Kikuyu', code: 'KE' },
  { id: 'kin_Latn', label: 'Kinyarwanda', code: 'RW' },
  { id: 'kir_Cyrl', label: 'Kyrgyz', code: 'KG' },
  { id: 'kmb_Latn', label: 'Kimbundu', code: 'AO' },
  { id: 'kmr_Latn', label: 'Northern Kurdish', code: 'TR' },
  { id: 'kon_Latn', label: 'Kikongo', code: 'CG' },
  { id: 'kor_Hang', label: 'Korean', code: 'KR' },
  { id: 'lao_Laoo', label: 'Lao', code: 'LA' },
  { id: 'lij_Latn', label: 'Ligurian', code: 'IT' },
  { id: 'lim_Latn', label: 'Limburgish', code: 'NL' },
  { id: 'lin_Latn', label: 'Lingala', code: 'CG' },
  { id: 'lit_Latn', label: 'Lithuanian', code: 'LT' },
  { id: 'lmo_Latn', label: 'Lombard', code: 'IT' },
  { id: 'ltg_Latn', label: 'Latgalian', code: 'LV' },
  { id: 'ltz_Latn', label: 'Luxembourgish', code: 'LU' },
  { id: 'lua_Latn', label: 'Luba-Kasai', code: 'CD' },
  { id: 'lug_Latn', label: 'Ganda', code: 'UG' },
  { id: 'luo_Latn', label: 'Luo', code: 'KE' },
  { id: 'lus_Latn', label: 'Mizo', code: 'IN' },
  { id: 'lvs_Latn', label: 'Standard Latvian', code: 'LV' },
  { id: 'mag_Deva', label: 'Magahi', code: 'IN' },
  { id: 'mai_Deva', label: 'Maithili', code: 'NP' },
  { id: 'mal_Mlym', label: 'Malayalam', code: 'IN' },
  { id: 'mar_Deva', label: 'Marathi', code: 'IN' },
  { id: 'min_Arab', label: 'Minangkabau (Arabic script)', code: 'ID' },
  { id: 'min_Latn', label: 'Minangkabau (Latin script)', code: 'ID' },
  { id: 'mkd_Cyrl', label: 'Macedonian', code: 'MK' },
  { id: 'plt_Latn', label: 'Plateau Malagasy', code: 'MG' },
  { id: 'mlt_Latn', label: 'Maltese', code: 'MT' },
  { id: 'mni_Beng', label: 'Meitei (Bengali script)', code: 'IN' },
  { id: 'khk_Cyrl', label: 'Halh Mongolian', code: 'MN' },
  { id: 'mos_Latn', label: 'Mossi', code: 'BF' },
  { id: 'mri_Latn', label: 'Maori', code: 'NZ' },
  { id: 'mya_Mymr', label: 'Burmese', code: 'MM' },
  { id: 'nld_Latn', label: 'Dutch', code: 'NL' },
  { id: 'nno_Latn', label: 'Norwegian Nynorsk', code: 'NO' },
  { id: 'nob_Latn', label: 'Norwegian Bokmål', code: 'NO' },
  { id: 'npi_Deva', label: 'Nepali', code: 'NP' },
  { id: 'nso_Latn', label: 'Northern Sotho', code: 'ZA' },
  { id: 'nus_Latn', label: 'Nuer', code: 'SD' },
  { id: 'nya_Latn', label: 'Nyanja', code: 'MW' },
  { id: 'oci_Latn', label: 'Occitan', code: 'FR' },
  { id: 'gaz_Latn', label: 'West Central Oromo', code: 'ET' },
  { id: 'ory_Orya', label: 'Odia', code: 'IN' },
  { id: 'pag_Latn', label: 'Pangasinan', code: 'PH' },
  { id: 'pan_Guru', label: 'Eastern Panjabi', code: 'IN' },
  { id: 'pap_Latn', label: 'Papiamento', code: 'AW' },
  { id: 'pes_Arab', label: 'Western Persian', code: 'IR' },
  { id: 'pol_Latn', label: 'Polish', code: 'PL' },
  { id: 'por_Latn', label: 'Portuguese', code: 'PT' },
  { id: 'prs_Arab', label: 'Dari', code: 'AF' },
  { id: 'pbt_Arab', label: 'Southern Pashto', code: 'PK' },
  { id: 'quy_Latn', label: 'Ayacucho Quechua', code: 'PE' },
  { id: 'ron_Latn', label: 'Romanian', code: 'RO' },
  { id: 'run_Latn', label: 'Rundi', code: 'BI' },
  { id: 'rus_Cyrl', label: 'Russian', code: 'RU' },
  { id: 'sag_Latn', label: 'Sango', code: 'CF' },
  { id: 'san_Deva', label: 'Sanskrit', code: 'IN' },
  { id: 'sat_Olck', label: 'Santali', code: 'IN' },
  { id: 'scn_Latn', label: 'Sicilian', code: 'IT' },
  { id: 'shn_Mymr', label: 'Shan', code: 'MM' },
  { id: 'sin_Sinh', label: 'Sinhala', code: 'LK' },
  { id: 'slk_Latn', label: 'Slovak', code: 'SK' },
  { id: 'slv_Latn', label: 'Slovenian', code: 'SI' },
  { id: 'smo_Latn', label: 'Samoan', code: 'WS' },
  { id: 'sna_Latn', label: 'Shona', code: 'ZW' },
  { id: 'snd_Arab', label: 'Sindhi', code: 'PK' },
  { id: 'som_Latn', label: 'Somali', code: 'SO' },
  { id: 'sot_Latn', label: 'Southern Sotho', code: 'ZA' },
  { id: 'spa_Latn', label: 'Spanish', code: 'ES' },
  { id: 'als_Latn', label: 'Tosk Albanian', code: 'AL' },
  { id: 'srd_Latn', label: 'Sardinian', code: 'IT' },
  { id: 'srp_Cyrl', label: 'Serbian', code: 'RS' },
  { id: 'ssw_Latn', label: 'Swati', code: 'SZ' },
  { id: 'sun_Latn', label: 'Sundanese', code: 'ID' },
  { id: 'swe_Latn', label: 'Swedish', code: 'SE' },
  { id: 'swh_Latn', label: 'Swahili', code: 'KE' },
  { id: 'szl_Latn', label: 'Silesian', code: 'PL' },
  { id: 'tam_Taml', label: 'Tamil', code: 'IN' },
  { id: 'tat_Cyrl', label: 'Tatar', code: 'RU' },
  { id: 'tel_Telu', label: 'Telugu', code: 'IN' },
  { id: 'tgk_Cyrl', label: 'Tajik', code: 'TJ' },
  { id: 'tgl_Latn', label: 'Tagalog', code: 'PH' },
  { id: 'tha_Thai', label: 'Thai', code: 'TH' },
  { id: 'tir_Ethi', label: 'Tigrinya', code: 'ER' },
  { id: 'taq_Latn', label: 'Tamasheq (Latin script)', code: 'ML' },
  { id: 'tpi_Latn', label: 'Tok Pisin', code: 'PG' },
  { id: 'tsn_Latn', label: 'Tswana', code: 'BW' },
  { id: 'tso_Latn', label: 'Tsonga', code: 'ZA' },
  { id: 'tuk_Latn', label: 'Turkmen', code: 'TM' },
  { id: 'tum_Latn', label: 'Tumbuka', code: 'MW' },
  { id: 'tur_Latn', label: 'Turkish', code: 'TR' },
  { id: 'twi_Latn', label: 'Twi', code: 'GH' },
  { id: 'tzm_Tfng', label: 'Central Atlas Tamazight', code: 'MA' },
  { id: 'uig_Arab', label: 'Uyghur', code: 'CN' },
  { id: 'ukr_Cyrl', label: 'Ukrainian', code: 'UA' },
  { id: 'umb_Latn', label: 'Umbundu', code: 'AO' },
  { id: 'urd_Arab', label: 'Urdu', code: 'PK' },
  { id: 'uzn_Latn', label: 'Northern Uzbek', code: 'UZ' },
  { id: 'vec_Latn', label: 'Venetian', code: 'IT' },
  { id: 'vie_Latn', label: 'Vietnamese', code: 'VN' },
  { id: 'war_Latn', label: 'Waray', code: 'PH' },
  { id: 'wol_Latn', label: 'Wolof', code: 'SN' },
  { id: 'xho_Latn', label: 'Xhosa', code: 'ZA' },
  { id: 'ydd_Hebr', label: 'Eastern Yiddish', code: 'IL' },
  { id: 'yor_Latn', label: 'Yoruba', code: 'NG' },
  { id: 'yue_Hant', label: 'Yue Chinese', code: 'HK' },
  { id: 'zho_Hans', label: 'Chinese (Simplified)', code: 'CN' },
  { id: 'zho_Hant', label: 'Chinese (Traditional)', code: 'TW' },
  { id: 'zsm_Latn', label: 'Standard Malay', code: 'MY' },
  { id: 'zul_Latn', label: 'Zulu', code: 'ZA' },
  ];
  