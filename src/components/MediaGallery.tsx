import React, { useState, useEffect } from 'react';
import { Tabs, Spin, Alert, Card, Row, Col, Typography } from 'antd';
import styles from '../styles/media.module.css';
import { imageData, videoData } from '../assets/data';

const { TabPane } = Tabs;
const { Title } = Typography;

interface ImageItem {
  id: number;
  title: string;
  content: string;
  imageUrl: string;
}

interface VideoItem {
  id: number;
  title: string;
  content: string;
  videoUrl: string;
  thumbnailUrl: string;
}

const extractYouTubeId = (url: string): string => {
  const regex = /(?:youtube\.com\/.*[?&]v=|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = url.match(regex);
  return match ? match[1] : '';
};

const isYouTubeUrl = (url: string) =>
  url.includes('youtube.com') || url.includes('youtu.be');

const MediaGallery: React.FC = () => {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [loadingImages, setLoadingImages] = useState(true);
  const [loadingVideos, setLoadingVideos] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [playingVideoId, setPlayingVideoId] = useState<number | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoadingImages(true);
        await new Promise(resolve => setTimeout(resolve, 800));
        setImages(imageData);
      } catch (err) {
        console.error('Error fetching images:', err);
        setError('Failed to load images. Please try again later.');
      } finally {
        setLoadingImages(false);
      }
    };

    fetchImages();
  }, []);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoadingVideos(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        setVideos(videoData);
      } catch (err) {
        console.error('Error fetching videos:', err);
        setError('Failed to load videos. Please try again later.');
      } finally {
        setLoadingVideos(false);
      }
    };

    fetchVideos();
  }, []);

  return (
    <div className={styles.galleryContainer}>
      <Tabs defaultActiveKey="images" centered>
        <TabPane tab="Images" key="images">
          {loadingImages ? (
            <div className={styles.loadingContainer}>
              <Spin size="large" />
            </div>
          ) : error ? (
            <Alert message={error} type="error" />
          ) : (
            <Row gutter={[24, 24]}>
              {images.map(image => (
                <Col xs={24} sm={12} md={8} lg={6} key={image.id}>
                  <Card
                    hoverable
                    className={styles.mediaCard}
                    cover={
                      <img
                        alt={image.title}
                        src={image.imageUrl}
                        className={styles.cardImage}
                      />
                    }
                  />
                </Col>
              ))}
            </Row>
          )}
        </TabPane>

        <TabPane tab="Videos" key="videos">
          {loadingVideos ? (
            <div className={styles.loadingContainer}>
              <Spin size="large" />
            </div>
          ) : error ? (
            <Alert message={error} type="error" />
          ) : (
            <>
              <Title level={2} className={styles.sectionTitle}>
                Video Collection
              </Title>
              <Row gutter={[24, 24]}>
                {videos.map(video => (
                  <Col xs={24} sm={12} md={8} lg={6} key={video.id}>
                    <Card
                      hoverable
                      className={styles.mediaCard}
                      onClick={() => setPlayingVideoId(video.id)}
                      cover={
                        playingVideoId === video.id ? (
                          isYouTubeUrl(video.videoUrl) ? (
                            <iframe
                              src={`https://www.youtube.com/embed/${extractYouTubeId(video.videoUrl)}?autoplay=1`}
                              title="YouTube Video"
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                              className={styles.cardVideo}
                            />
                          ) : (
                            <video
                              src={video.videoUrl}
                              controls
                              autoPlay
                              className={styles.cardVideo}
                            />
                          )
                        ) : (
                          <div className={styles.thumbnailContainer}>
                            <img
                              alt={video.title}
                              src={video.thumbnailUrl}
                              className={styles.cardImage}
                            />
                            <div className={styles.playOverlay}>
                              <div className={styles.playButton}>▶</div>
                            </div>
                          </div>
                        )
                      }
                    />
                  </Col>
                ))}
              </Row>
            </>
          )}
        </TabPane>
      </Tabs>
    </div>
  );
};

export default MediaGallery;
