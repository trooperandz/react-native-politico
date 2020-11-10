import { ImageProps, ImageURISource} from 'react-native';

export interface Avatar extends ImageProps {
  party?: string | undefined;
  imageUrl?: string;
  style?: {};
  source: ImageURISource;
}
