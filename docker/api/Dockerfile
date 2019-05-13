FROM php:7.2-apache

ENV TIMEZONE=Europe/Paris
ENV XDEBUG_IDEKEY=phpstorm-idekey

RUN apt-get update && \
    apt-get install -y wget git

#Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# PHPUnit
RUN wget https://phar.phpunit.de/phpunit-6.5.phar && \
    chmod +x phpunit-6.5.phar && \
    mv phpunit-6.5.phar /usr/local/bin/phpunit

# opcache setup
RUN docker-php-ext-configure opcache --enable-opcache && \
    docker-php-ext-install opcache

# Set timezone
RUN ln -snf /usr/share/zoneinfo/$TIMEZONE /etc/localtime && \
    echo $TIMEZONE > /etc/timezone

# PHP Config
RUN apt-get install -y zlib1g-dev \
    && docker-php-ext-install zip
RUN docker-php-ext-install pdo pdo_mysql

# Apache conf
RUN a2enmod rewrite
ADD apache-config.conf /etc/apache2/sites-enabled/000-default.conf