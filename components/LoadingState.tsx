import { ConfigProvider, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import theme from "@/theme/index";

type Props = {
	text: string;
	isLoading: boolean;
};

const LoadingState = ({ text, isLoading }: Props) => {
	return (
		isLoading && (
			<div className="absolute text-white h-full w-full z-10 flex flex-col justify-center items-center bg-black/50 backdrop-filter backdrop-blur-md">
				<div className="flex flex-col gap-3">
					<ConfigProvider theme={theme}>
						<Spin
							indicator={
								<LoadingOutlined
									style={{ fontSize: 40 }}
									spin
								/>
							}
						/>
					</ConfigProvider>
					<p className="text-lg tracking-wider text-gray-500">{text}</p>
				</div>
			</div>
		)
	);
};

export default LoadingState;
